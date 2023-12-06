"use client";
import MainWeather from "@/component/MainWeather";
import Menubar from "@/component/MenuBar";
import axios from "axios";
import "@/style/main.scss";
import Image from "next/image";
import BestItem from "@/component/BestItem";
import BestCoordi from "@/component/BestCoordi";

export default function Mainpage() {
  return (
    <div className="container">
      <header>
        <div className="top">
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
        <BestItem />
        <br />
        <BestCoordi />
      </section>
      <Menubar />
    </div>
  );
}
