"use client"
import MainWeather from "@/component/MainWeather"
import Menubar from "@/component/MenuBar"
import axios from "axios";
// import { GetServerSideProps } from "next";

interface MainPageProps {
  accessToken?  : string
}

export default function Mainpage( ) {

    const send = async() => {
      const send = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/user/api/signup",
        data : {
          email : "dong123@test.com",
          name : "황동",
          nickname : "동준이이dong",
          password : "1234"
        }
      }); 
      console.log("rkdlq", send)
    }

    // const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log("accessToken: ", accessToken);

    return(<>
        <MainWeather />
        <div >오늘 날씨에 손이 가는 아이템 추천</div>
        <div >좋아요 많은 순 게시물의 이미지 가지고 오기</div>
        <button onClick={send}>qjxms</button>
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