"use client"
import MainWeather from "@/component/MainWeather"
import Menubar from "@/component/MenuBar"
import axios from "axios";
import "../style/main.scss"
// import { GetServerSideProps } from "next";

interface MainPageProps {
  accessToken?  : string
}

export default function Mainpage( ) {

    // const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log("accessToken: ", accessToken);

    return(<>
        {/* <MainWeather /> */}
        <div className="weather_main"></div>
        <div className="likeclothes_main">오늘 날씨에 손이 가는 아이템 추천</div>
        <div className="likefeed_main">좋아요 많은 순 게시물의 이미지 가지고 오기</div>
        <Menubar />
    </>)
}


// export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({ req }) => {
//   const { accessToken } = req.cookies;

//   return {
//     props: {
//       accessToken,
//     },
//   };
// };