"use client";

import WeatherBar from "@/component/WeatherBar";
import Image from "next/image";
import "../../style/detail.scss";
import Menubar from "@/component/MenuBar";
import Profile from "@/component/Profile";
import ImageDetail from "@/component/ImageDetail";
import Comments from "@/component/Comments";
import Like from "@/component/Like";
import { useEffect, useState } from "react";
import axios from "axios";
import ContentDetail from "@/component/ContentDetail";

import { RecoilRoot } from "recoil";

export default function Detail(): JSX.Element {
  const [boardDetail, setBoardDetail] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "https://www.jerneithe.site/board/detail/{boardId}",
          "https://www.jerneithe.site/board/detail/1",
        );
        setBoardDetail(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <RecoilRoot>
      <div className="container">
        <header className="top w-full">
          <div className="w-full h-12 flex items-center ">
            <Image
              src="/images/back.svg"
              width={15}
              height={15}
              className="ml-3 cursor-pointer"
              alt="back"
              onClick={() => {
                window.history.back();
              }}
            />
          </div>
          <hr className="w-full h-px" />
          <WeatherBar />
          <hr className="w-full h-px" />
        </header>

        <section className="main w-5/6 h-full">
          {boardDetail && (
            <>
              <Profile nickName={boardDetail.nickName} />
              <ImageDetail images={boardDetail.images} />
              <ContentDetail
                content={boardDetail.content}
                hashTag={boardDetail.hashTag}
              />
              <div className="button flex">
                <Like />
                <Comments />
              </div>
            </>
          )}
        </section>

        <footer className="w-full">
          <Menubar />
        </footer>
      </div>
    </RecoilRoot>
  );
}
