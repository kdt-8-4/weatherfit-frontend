"use client";
import Menubar from "@/component/MenuBar";
import WeatherBar from "@/component/WeatherBar";
import CloseIcon from "@mui/icons-material/Close";
import "../../style/upload.scss";
import "@/style/GotoLogin.scss"
import ImageUpload from "@/component/ImageUpload";
import TextArea from "@/component/TextArea";
import SelectCategory from "@/component/SelectCategory";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { categories } from "@/component/category";
import axios from "axios";
import { Login_token } from "@/recoilAtom/Login_token";
import { WeatherIcons } from "@/recoilAtom/WeatherIcon";
import { TemNowControl } from "@/recoilAtom/TemNow";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Link from "next/link";

export default function Upload(): JSX.Element {
  const [isUploading, setIsUploading] = useState(false);
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
  //openweathermap에서 제공하는 icon과 현재 온도
  const [icon, setIcon] = useRecoilState(WeatherIcons);
  const [usetemp, setTemp] = useRecoilState(TemNowControl);

  // 로그인 확인 후 페이지 로드
  const [logincheck, setCheck] = useState<boolean>(false);
  // 토큰 값
  const [logintoken, setLoginToken] = useState<string | undefined>("");

  //쿠기 가져오고 State에 넣기
  const cookie = () => {
    const accessToken = Cookies.get("accessToken");
    console.log("accessToken 값: ", accessToken);
    setLoginToken(accessToken);
  };

  useEffect(() => {
    cookie();
    if (logintoken === undefined) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  }, [logintoken]);

  const handleImagesSelected = useCallback((files: File[] | null) => {
    setSelectedImages(files ? Array.from(files) : []);
    console.log("handleImagesSelected");
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
    if (isUploading) {
      return;
    }
    setIsUploading(true);

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
        temperature: usetemp,
        weatherIcon: `https://openweathermap.org/img/wn/${icon}.png`,
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
          Authorization: "Bearer " + logintoken,
        },
      });

      console.log(response.data); // 서버 응답 확인
      alert("게시물 업로드 완료");
      window.location.href = "/feed";
    } catch (error) {
      console.error(error);
    }

    setIsUploading(false);
  };

  console.log("로그인 토큰 존재 확인", logincheck);
  console.log("로그인 토큰 값", logintoken);
  console.log("icon", icon);
  console.log("온도", usetemp);

  return (
    <>
      {logincheck ? (
        <div className="container">
          <header>
            <div className="top">
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
              <button
                type="button"
                id="btn_complete"
                onClick={handleComplete}
                disabled={isUploading}>
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
      ) : (
        <>
          <br />
          <br />
          <br />
          <div id="login_msg"> 로그인 후에 업로드할 수 있습니다. </div>
          <br />
          <br />
          <Link className="goto" href={"/login"}>로그인 페이지로 이동</Link>
          <br />
          <Link className="goto" href={"/"}>홈 페이지로 이동</Link>
        </>
      )}
    </>
  );
}
