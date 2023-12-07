"use client";
import MainWeather from "@/component/MainWeather";
import Menubar from "@/component/MenuBar";
import axios from "axios";
import "@/style/main.scss";
import Image from "next/image";
import BestItem from "@/component/BestItem";
import BestCoordi from "@/component/BestCoordi";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { WeatherState } from "@/recoilAtom/WeatherState";

export default function Mainpage() {
  const weather = useRecoilValue(WeatherState);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function getTop5() {
      try {
        const response = await axios({
          method: "GET",
          url: `https://www.jerneithe.site/category/tops?temp_min=${weather.min}&temp_max=${weather.max}`,
        });

        const response2 = await axios({
          method: "GET",
          url: `https://www.jerneithe.site/board/tops?temp_min=${weather.min}&temp_max=${weather.max}`,
          // url: `https://www.jerneithe.site/board/tops?temp_min=0&temp_max=10`,
        });

        setCategories(response.data.result);
        console.log("카테고리 top5", response.data.result);

        setBoards(response2.data.content);
        console.log("게시물 top5", response2.data.content);
        setIsLoading(false); // 로딩 완료 후 상태 업데이트
      } catch (err) {
        console.error(err);
      }
    }
    getTop5();
    setIsLoading(false);
  }, [weather.max, weather.min]);

  return (
    <div className="container">
      {isLoading ? (
        <div
          style={{
            height: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            className="logo"
            src="/images/logo2.svg"
            alt="옷늘날씨"
            width={200}
            height={150}
          />
          Loading...
        </div>
      ) : (
        <>
          <header>
            <div className="top_main">
              <div className="img_wrap">
                <Image
                  className="logo"
                  src="/images/logo2.svg"
                  alt="옷늘날씨"
                  width={150}
                  height={90}
                />
              </div>
            </div>
          </header>
          <section className="main">
            <MainWeather />
            <br />
            <BestItem categories={categories} />
            <br />
            <BestCoordi boards={boards} />
          </section>
          <Menubar />
        </>
      )}
    </div>
  );
}
