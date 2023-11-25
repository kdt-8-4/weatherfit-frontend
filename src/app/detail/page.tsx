"use client";

import WeatherBar from "@/component/WeatherBar";
import Image from "next/image";
import "../../style/detail.scss";
import Menubar from "@/component/MenuBar";
import Profile from "@/component/Profile";
import ImageDetail from "@/component/ImageDetail";

export default function Detail(): JSX.Element {
  return (
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

      <section className="main w-full h-full">
        <Profile />
        <ImageDetail />
      </section>

      <footer className="w-full">
        <Menubar />
      </footer>
    </div>
  );
}
