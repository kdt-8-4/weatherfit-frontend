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
import Image from "next/image";

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

export default function EditDetail(): JSX.Element {
  const [editBoardId, setEditBoardId] = useRecoilState(editBoardIdState);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [initialImages, setInitialImages] = useState<Image[]>([]);
  const [newExistingImages, setNewExistingImages] = useState<Image[]>([]);
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);
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

  useEffect(() => {
    console.log(deleteImageIds);
  }, [deleteImageIds]);

  const fetchBoardDetail = async () => {
    const response = await axios.get(
      `https://www.jerneithe.site/board/detail/${editBoardId}`,
      {
        headers: { Authorization: "Bearer " + accessToken },
      },
    );
    const data = response.data;

    const initialImages = data.images.map((image: any) => ({
      imageId: image.imageId,
      imageUrl: image.imageUrl,
    }));
    setInitialImages(initialImages);

    setContent(data.content);
    setHashtags(data.hashTag);
    setSelectedCategories(mapSubCategoriesToCategory(data.category));
  };

  const handleImagesSelected = useCallback((files: File[] | null) => {
    setSelectedImages(files ? Array.from(files) : []);
  }, []);

  const handleExistingImagesSelected = (images: Image[] | null) => {
    setNewExistingImages(images ? Array.from(images) : []);
  };

  const handleDeleteImage = (imageId: number) => {
    setDeleteImageIds((prevIds) => [...prevIds, imageId]);
  };

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
      const allImages = [...newExistingImages, ...selectedImages];
      console.log("allImages", allImages);
      console.log("selectedImages", selectedImages);

      const allSelectedSubCategories = Object.values(selectedCategories).reduce(
        (acc, subCategories) => acc.concat(subCategories),
        [],
      );

      let formData = new FormData();
      let boardData = {
        hashTag: hashtags,
        category: allSelectedSubCategories,
        content: content,
        deletedImages: deleteImageIds,
      };

      formData.append("board", JSON.stringify(boardData));

      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      if (allImages.length === 0 && initialImages.length === 0) {
        alert("이미지를 추가해주세요!");
        return;
      }

      if (content.trim() === "") {
        alert("글을 작성해주세요!");
        return;
      }

      await axios({
        method: "PATCH",
        url: `https://www.jerneithe.site/board/edit/${editBoardId}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + accessToken,
        },
      });

      //** formData 키:값 출력
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      alert("게시물 수정 완료!");
      window.location.href = "/detail";
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
      }
      console.error(error);
    }
  };

  return (
    <div className="container">
      <header className="header_edit">
        <div className="top_edit">
          <CloseIcon
            id="x"
            onClick={() => {
              window.history.back();
            }}
          />
          <div className="img_wrap">
            <Image
              className="logo"
              src="/images/logo2.svg"
              alt="옷늘날씨"
              width={150}
              height={90}
            />
          </div>
          <button type="button" id="btn_complete" onClick={handleComplete}>
            완료
          </button>
        </div>
        <hr />
        <WeatherBar />
        <hr />
      </header>
      <section className="main">
        <h2 className="edit_text">수정하기</h2>
        <div className="content">
          <ImageUpload
            onImagesSelected={handleImagesSelected}
            initialImages={initialImages}
            onDeleteImage={handleDeleteImage}
            onExistingImagesSelected={handleExistingImagesSelected}
          />
          <br />
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
