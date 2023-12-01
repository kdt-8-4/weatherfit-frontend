"use client";
import Menubar from "@/component/MenuBar";
import WeatherBar from "@/component/WeatherBar";
import CloseIcon from "@mui/icons-material/Close";
import "../../../style/upload.scss";
import ImageUpload from "@/component/ImageUpload";
import TextArea from "@/component/TextArea";
import SelectCategory from "@/component/SelectCategory";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRecoilState } from "recoil";
import { editBoardIdState } from "@/recoilAtom/EditDetail";
import { categories } from "@/component/category";

const mapSubCategoriesToCategory = (
  subCategories: string[],
): Record<string, string[]> => {
  const categoryMap: Record<string, string[]> = {};
  for (const [category, subCategoryList] of Object.entries(categories)) {
    for (const subCategory of subCategoryList) {
      if (subCategories.includes(subCategory)) {
        if (!categoryMap[category]) {
          categoryMap[category] = [];
        }
        categoryMap[category].push(subCategory);
      }
    }
  }
  return categoryMap;
};

interface Image {
  imageId: number;
  imageUrl: string;
}

async function urlToFile(url: any, filename: any) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorObj = await res.json();
      throw new Error(errorObj.error);
    }
    const blob = await res.blob();
    const extension = filename.split(".").pop();

    let mimeType = "";
    switch (extension) {
      case "jpg":
      case "jpeg":
        mimeType = "image/jpeg";
        break;
      case "png":
        mimeType = "image/png";
        break;
      default:
        mimeType = "application/octet-stream"; // Fallback option
    }

    return new File([blob], filename, { type: mimeType });
  } catch (error) {
    console.error(`There was a problem with the fetch operation: ${error}`);
    return new File([], filename);
  }
}

export default function EditDetail(): JSX.Element {
  const [editBoardId, setEditBoardId] = useRecoilState(editBoardIdState);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [initialImages, setInitialImages] = useState<Image[]>([]);
  const [content, setContent] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, string[]>
  >({});

  const accessToken = Cookies.get("accessToken");
  console.log("accessToken 값: ", accessToken);

  useEffect(() => {
    fetchBoardDetail();
  }, []);

  const fetchBoardDetail = async () => {
    const response = await axios.get(
      `https://www.jerneithe.site/board/detail/${editBoardId}`,
      {
        headers: { Authorization: "Bearer " + accessToken },
      },
    );
    const data = response.data;
    console.log("게시물 데이터: ", data);

    const initialImages = data.images.map((image: any) => ({
      imageId: image.imageId,
      imageUrl: image.image_url,
    }));
    setInitialImages(initialImages);

    setContent(data.content);
    setHashtags(data.hashTag);
    setSelectedCategories(mapSubCategoriesToCategory(data.category));
  };

  const handleImagesSelected = useCallback((files: File[] | null) => {
    setSelectedImages(files ? Array.from(files) : []);
  }, []);

  const handleContent = (text: string) => {
    setContent(text);
  };
  const handleHashtags = (extractedHashtags: string[]) => {
    setHashtags(extractedHashtags);
  };

  const handleCategorySelect = useCallback(
    (category: string, subCategories: string[]) => {
      setSelectedCategories((prev) => ({ ...prev, [category]: subCategories }));
    },
    [],
  );

  const handleComplete = async () => {
    try {
      const existingImagesAsFiles = (
        await Promise.all(
          initialImages.map((image) => {
            const filename = image.imageUrl.split("/").pop() || "image";
            return urlToFile(image.imageUrl, filename);
          }),
        )
      ).filter(Boolean);

      const allImages = [...existingImagesAsFiles, ...selectedImages];

      const allSelectedSubCategories = Object.values(selectedCategories).reduce(
        (acc, subCategories) => acc.concat(subCategories),
        [],
      );

      let formData = new FormData();
      let boardData = {
        hashTag: hashtags,
        category: allSelectedSubCategories,
        content: content,
      };

      formData.append("board", JSON.stringify(boardData));
      allImages.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios({
        method: "PATCH",
        url: `https://www.jerneithe.site/board/edit/${editBoardId}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + accessToken,
        },
      });

      console.log(response.data); // 서버 응답 확인
      alert("게시물 수정 완료");
      window.location.href = "/feed";
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
      }
      console.error(error);
    }
  };

  return (
    <div className="container">
      <header>
        <div className="top">
          <CloseIcon
            id="x"
            onClick={() => {
              window.history.back();
            }}
          />
          <h2>수정하기</h2>
          <button type="button" id="btn_complete" onClick={handleComplete}>
            완료
          </button>
        </div>
        <hr />
        <WeatherBar />
        <hr />
      </header>
      <section className="main">
        <div className="content">
          <ImageUpload
            onImagesSelected={handleImagesSelected}
            initialImages={initialImages}
          />
          <hr />
          <TextArea
            content={content}
            placeholder="코디에 같이 올리고 싶은 글과 #해시태그를 작성해주세요"
            handleHashtags={handleHashtags}
            handleContent={handleContent}
          />
        </div>
        <div className="category">
          <div>
            {Object.entries(categories).map(([category, subCategories]) => (
              <SelectCategory
                key={category}
                category={category}
                subCategories={subCategories}
                initialSelectedSubCategories={
                  selectedCategories[category] || []
                }
                onSelect={(selectedSubCategories) =>
                  handleCategorySelect(category, selectedSubCategories)
                }
              />
            ))}
          </div>
        </div>
      </section>

      <Menubar />
    </div>
  );
}