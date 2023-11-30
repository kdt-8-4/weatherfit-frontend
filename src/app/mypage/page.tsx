"use client";
import React, { useEffect, useState } from "react";
import "../../style/mypage.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Menubar from "@/component/MenuBar";
import TabBar from "@/component/TabBar";
import ProfileModal from "@/component/ProfileModal";
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'; // > 아이콘
import axios from "axios";
import MypageProfile from "@/component/MypageProfile";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

interface IMAGE {
  boardId: number;
  imageId: number;
  image_url: string;
}

interface FEEDATA {
  boardId: number;
  images: IMAGE;
  likeCount: number;
  nickName: string;
  temperature: number;
  weather: string;
}

export default function Mypage() {
  // 회원 정보 수정 모달
  const [showProfileModify, setShowProfileModify] = useState<boolean>(false);

  // 회원 정보 수정 모달 이벤트
  const handleSettingsClick = () => {
    setShowProfileModify(!showProfileModify);
  };

  // 회원 정보
  const [userPofile, setUserProfile] = useState<any>(null);
  const [nickname, setNickname] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  useEffect(() => {
    const profileData = async () => {
      // 회원 정보 데이터
      try {
        // const response = await axios({
        //   method: "POST",
        //   url: `https://www.jerneithe.site/user/api/profile`,
        //   data: { email: "user91@test.com" },
        //   // headers: {
        //   //   Authorization: "weatherfit",
        //   // },
        // });

        const accessToken = Cookies.get("accessToken");
        console.log("accessToken 값: ", accessToken);

        const decodedToken = accessToken
          ? (jwt.decode(accessToken) as { [key: string]: any })
          : null;
        const decoded_nickName = decodedToken?.sub;
        console.log("디코딩", decodedToken);

        const response = await axios.post(
          `https://www.jerneithe.site/user/api/profile`,
          { email: "user91@test.com" }
        );
        setUserProfile(response.data);

        // 비밀번호 디코딩
        let password_jwt: string = response.data.password;
        const decodedPass = password_jwt
          ? (jwt.decode(password_jwt) as { [key: string]: any })
          : null;
        // console.log("디코딩 비번", decodedPass);
        const decoded_password = decodedPass?.sub;
        setPassword(decoded_password);

        console.log("postData: ", response.data);
      } catch (error) {
        console.error("회원정보 에러: ", error);
      }

      // ---------------------------------------------------------

      // board 데이터 불러오기
      // const req = await axios({
      //   method: "GET",
      //   url: "https://www.jerneithe.site/board/list",
      // });

      // console.log("받아온 데이터", req.data);

      // const copy: FEEDATA[] = req.data;

      // console.log("카피", copy);
    };
    profileData();
  }, []);

  console.log("디코딩 비번", password);

  return (
    <>
      <div className="container">
        {/* header 넣을지 말지 */}
        {/* <header>로고 이미지</header> */}
        <div className="top">
          <h2 className="title">마이페이지</h2>
          <SettingsIcon className="icon" onClick={handleSettingsClick} />
        </div>
        <div className="mypage_body">
          {/* ------------- 프로필 부분 ------------- */}
          {userPofile && (
            <>
              <MypageProfile nickname={userPofile.nickname} />
            </>
          )}
          {/* --------------------------------------- */}
          {/* ------------- tap 부분 ------------- */}
          <TabBar />
        </div>
        <Menubar />
      </div>
      {showProfileModify && (
        <ProfileModal
          handleSettingsClick={handleSettingsClick}
          email={userPofile.email}
          name={userPofile.name}
          password={userPofile.password}
        />
      )}
    </>
  );
}
