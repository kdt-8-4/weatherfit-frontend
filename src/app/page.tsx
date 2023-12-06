"use client";
import MainWeather from "@/component/MainWeather";
import Menubar from "@/component/MenuBar";
import axios from "axios";
import "@/style/main.scss";
// import { GetServerSideProps } from "next";
import Image from "next/image";
import BestItem from "@/component/BestItem";
import BestCoordi from "@/component/BestCoordi";

interface MainPageProps {
  accessToken?: string;
}

export default function Mainpage() {

  // const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  // console.log("accessToken: ", accessToken);

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

// export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({ req }) => {
//   const { accessToken } = req.cookies;

//   return {
//     props: {
//       accessToken,
//     },
//   };
// };
