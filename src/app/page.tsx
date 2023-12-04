"use client";
import MainWeather from "@/component/MainWeather";
import Menubar from "@/component/MenuBar";
import axios from "axios";
import "@/style/main.scss";
// import { GetServerSideProps } from "next";
import Image from "next/image";

interface MainPageProps {
  accessToken?: string;
}

export default function Mainpage() {
  const send = async () => {
    const send = await axios({
      method: "POST",
      url: "https://www.jerneithe.site/user/api/signup",
      data: {
        email: "dong123@test.com",
        name: "황동",
        nickname: "동준이이dong",
        password: "1234",
      },
    });
    console.log("rkdlq", send);
  };

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
        <div>오늘 날씨에 손이 가는 아이템 추천</div>
        <div>좋아요 많은 순 게시물의 이미지 가지고 오기</div>
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
