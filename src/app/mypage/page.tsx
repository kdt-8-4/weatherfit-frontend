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

export default function Mypage() {
  // 회원 정보 수정 모달
  const [showProfileModify, setShowProfileModify] = useState<boolean>(false);
  // 로그인 확인 후 페이지 로드
  const [logincheck, setCheck] = useState<boolean>(false);
  // 토큰 값
  const [logintoken, setToken] = useState<string | undefined>("");

  const cookie = () => {
    const accessToken = Cookies.get("accessToken");
    console.log("accessToken 값: ", accessToken);
    setToken(accessToken);
  }

  useEffect(()=>{
    //쿠키 가져오기
    cookie();
    if(logintoken === undefined) {
      setCheck(false);
    } else {
      setCheck(true);
    }

  },[logintoken]);

  // 회원 정보 수정 모달 이벤트
  const handleSettingsClick = () => {
    setShowProfileModify(!showProfileModify);
  };

  console.log('로그인 토큰 존재 확인', logincheck);
  console.log('로그인 토큰 값', logintoken);

  return (
    <>
      { logincheck ? 
      <div className="container">
        
        {/* header 넣을지 말지 */}
        {/* <header>로고 이미지</header> */}
        <div className="top">
          <h2 className="title">마이페이지</h2>
          <SettingsIcon className="icon" onClick={handleSettingsClick} />
        </div>
        <div className="mypage_body">
          {/* ------------- 프로필 부분 ------------- */}
          <div className="user">
            <div className="user_profile">
              <AccountCircleOutlinedIcon className="user_image" />
              <p className="user_name">김똥이</p>
            </div>
            <div className="user_info">
              <div className="num_box">
                <p className="user_post">내 게시물</p>
                <p className="user_post_num">7</p>
              </div>
              <div className="num_box">
                <p className="user_like">좋아요 한 게시물</p>
                <p className="user_like_num">10</p>
              </div>
            </div>
          </div>
          {/* --------------------------------------- */}
          {/* ------------- tap 부분 ------------- */}
          <TabBar />
        </div>
        <Menubar />
      </div>  : 
      <>
        <div>로그인을 해주세요.</div>
        <Link href={'/login'}>로그인 페이지로 이동</Link>
      </>
      }
      
      {showProfileModify && (
        <ProfileModal handleSettingsClick={handleSettingsClick} />
      )}
    
      
    </>
  );
}
