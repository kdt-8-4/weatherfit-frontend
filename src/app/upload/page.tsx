"use client";
import Menubar from "@/component/MenuBar";
import WeatherBar from "@/component/WeatherBar";
import CloseIcon from "@mui/icons-material/Close";
import "../../style/upload.scss";
import ImageUpload from "@/component/ImageUpload";
import TextArea from "@/component/TextArea";
import SelectCategory from "@/component/SelectCategory";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function Upload(): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, string[]>
  >({});

  const handleImagesSelected = useCallback((files: File[] | null) => {
    // if (files) {
    setSelectedImages(files ? Array.from(files) : []);
    // }
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
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data); // 서버 응답 확인
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <header>
        <div className="top">
          <CloseIcon id="x" />
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
          <ImageUpload onImagesSelected={handleImagesSelected} />
          <hr />
          <TextArea
            content={content}
            placeholder="코디에 같이 올리고 싶은 #해시태그를 작성해주세요"
            handleHashtags={handleHashtags}
            handleContent={handleContent}
          />
        </div>
        <div className="category">
          <div>
            <SelectCategory
              category="상의"
              subCategories={[
                "맨투맨",
                "셔츠/블라우스",
                "후드티",
                "니트/스웨터",
                "반팔티",
                "카라티",
                "긴팔티",
                "민소매",
                "스포츠",
                "기타",
              ]}
              onSelect={(subCategories) =>
                handleCategorySelect("상의", subCategories)
              }
            />
            <SelectCategory
              category="하의"
              subCategories={[
                "데님 팬츠",
                "코튼 팬츠",
                "슬랙스",
                "트레이닝 팬츠",
                "조거 팬츠",
                "숏 팬츠",
                "레깅스",
                "점프 슈트",
                "스포츠 하의",
                "기타",
              ]}
              onSelect={(subCategories) =>
                handleCategorySelect("하의", subCategories)
              }
            />
            <SelectCategory
              category="아우터"
              subCategories={[
                "후드 집업",
                "가디건",
                "베스트",
                "플리스",
                "아노락",
                "블루종",
                "라이더 자켓",
                "트러커 자켓",
                "무스탕",
                "블레이저",
                "싱글 코트",
                "더블 코트",
                "더플 코트",
                "롱패딩",
                "숏패딩",
                "기타",
              ]}
              onSelect={(subCategories) =>
                handleCategorySelect("아우터", subCategories)
              }
            />
            <SelectCategory
              category="신발"
              subCategories={[
                "스니커즈",
                "컨버스",
                "워커",
                "로퍼",
                "보트화",
                "슬립온",
                "운동화",
                "구두",
                "부츠",
                "플랫 슈즈",
                "블로퍼",
                "샌들",
                "슬리퍼",
                "기타",
              ]}
              onSelect={(subCategories) =>
                handleCategorySelect("신발", subCategories)
              }
            />
            <SelectCategory
              category="가방"
              subCategories={[
                "백팩",
                "메신저백",
                "크로스백",
                "숄더백",
                "토트백",
                "에코백",
                "더플백",
                "클러치백",
                "이스트백",
              ]}
              onSelect={(subCategories) =>
                handleCategorySelect("가방", subCategories)
              }
            />
            <SelectCategory
              category="모자"
              subCategories={[
                "베레모",
                "페도라",
                "버킷/사파리햇",
                "비니",
                "트루퍼",
              ]}
              onSelect={(subCategories) =>
                handleCategorySelect("모자", subCategories)
              }
            />
          </div>
        </div>
      </section>

      <footer>
        <Menubar />
      </footer>
    </div>
  );
}
