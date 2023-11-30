"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import "../../style/mypage.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Menubar from "@/component/MenuBar";
import TabBar from "@/component/TabBar";
import ProfileModal from "@/component/ProfileModal";
import Cookies from "js-cookie";
import Link from "next/link";

// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'; // > 아이콘
import axios from "axios";
import MypageProfile from "@/component/MypageProfile";
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

  // 회원 정보
  const [userPofile, setUserProfile] = useState<any>(null);
  const [nickname, setNickname] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  // 로그인 확인 후 페이지 로드
  const [logincheck, setCheck] = useState<boolean>(false);
  // 토큰 값
  const [logintoken, setToken] = useState<string | undefined>("");

  const [myPostData, setMyPostData] = useState<FEEDATA[]>([]);

  const cookie = () => {
    const accessToken = Cookies.get("accessToken");
    console.log("accessToken 값: ", accessToken);
    setToken(accessToken);
  };

  useEffect(() => {
    //쿠키 가져오기
    cookie();
    if (logintoken === undefined) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  }, [logintoken]);

  // ------------------------------------------------------------------------

  console.log("로그인 토큰 존재 확인", logincheck);
  console.log("로그인 토큰 값", logintoken);

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
          { email: "user94@test.com" }
        );
        setUserProfile(response.data);

        // 비밀번호 디코딩
        let pw_jwt: string = response.data.password;

        // 기존 것
        // let password_jwt: string = response.data.password;
        // const decodedPass = password_jwt
        //   ? (jwt.decode(password_jwt) as { [key: string]: any })
        //   : null;
        // // console.log("디코딩 비번", decodedPass);
        // const decoded_password = decodedPass?.sub;
        // setPassword(decoded_password);

        console.log("postData: ", response.data);
      } catch (error) {
        console.error("회원정보 에러: ", error);
      }
    };
    profileData();
  }, []);

  // ---------------------------------------------------------

  // board 이미지 데이터 불러오기
  useEffect(() => {
    const postData = async () => {
      const req = await axios.get("https://www.jerneithe.site/board/list");
      const data: FEEDATA[] = req.data;
      const filteredData = data.filter((item) => item.nickName === "dongdong");
      console.log("filterData: ", filteredData);
      setMyPostData(filteredData);
    };
    postData();
  }, []);

  console.log("디코딩 비번: ", password);

  // 회원 정보 수정 모달 이벤트
  const handleSettingsClick = () => {
    setShowProfileModify(!showProfileModify);
  };

  return (
    <>
      {logincheck ? (
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
            <TabBar myPostData={myPostData} />
          </div>
          <Menubar />
        </div>
      ) : (
        <>
          <div>로그인을 해주세요.</div>
          <Link href={"/login"}>로그인 페이지로 이동</Link>
        </>
      )}

      {showProfileModify && (
        <ProfileModal
          handleSettingsClick={handleSettingsClick}
          email={userPofile.email}
          name={userPofile.name}
          password={password}
        />
      )}
    </>
  );
}
