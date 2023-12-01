"use client";
import Menubar from "@/component/MenuBar";
import WeatherBar from "@/component/WeatherBar";
import CloseIcon from "@mui/icons-material/Close";
import "../../style/upload.scss";
import ImageUpload from "@/component/ImageUpload";
import TextArea from "@/component/TextArea";
import SelectCategory from "@/component/SelectCategory";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { categories } from "@/component/category";
import axios from "axios";
import { Login_token } from "@/recoilAtom/Login_token";
import { useRecoilState } from "recoil";

export default function Upload(): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [initialSubCategories, setInitialSubCategories] = useState<string[][]>(
    Array(Object.entries(categories).length).fill([]),
  );
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, string[]>
  >({});
  const [token, setToken] = useRecoilState(Login_token);

  const accessToken = Cookies.get("accessToken");
  console.log("accessToken 값: ", accessToken);

  useEffect(() => {
    console.log("토큰값을 받아왔는가", token);
  }, []);

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
    if (selectedImages.length === 0) {
      alert("이미지를 추가해주세요!");
      return;
    }

    if (content.trim() === "") {
      alert("글을 작성해주세요!");
      return;
    }

    try {
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
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/board/write",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + accessToken,
        },
      });

      console.log(response.data); // 서버 응답 확인
      alert("게시물 업로드 완료");
      window.location.href = "/feed";
    } catch (error) {
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
          <h2>등록하기</h2>
          <button type="button" id="btn_complete" onClick={handleComplete}>
            완료
          </button>
        </div>
        <hr />
        <WeatherBar />
        <hr />
      </header>
      <section className="main">
        <h2>오늘 날씨의 옷차림을 올려주세요!</h2>
        <div className="content">
          <ImageUpload
            onImagesSelected={handleImagesSelected}
            initialImages={[]}
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
            {Object.entries(categories).map(
              ([category, subCategories], index) => (
                <SelectCategory
                  key={category}
                  category={category}
                  subCategories={subCategories}
                  initialSelectedSubCategories={initialSubCategories[index]}
                  onSelect={(selectedSubCategories) =>
                    handleCategorySelect(category, selectedSubCategories)
                  }
                />
              ),
            )}
          </div>
        </div>
      </section>

      <Menubar />
    </div>
  );
}
