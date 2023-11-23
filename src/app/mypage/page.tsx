"use client";
import { useState } from "react";
import "../../style/mypage.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Menubar from "@/component/MenuBar";
import TabBar from "@/component/TabBar";
import Profile from "@/component/Profile";
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'; // > 아이콘

export default function Mypage() {
  const [showProfileModify, setShowProfileModify] = useState<boolean>(false);

  const handleSettingsClick = () => {
    setShowProfileModify(!showProfileModify);
  };
  return (
    <>
      <div className="container">
        {/* header 넣을지 말지 */}
        {/* <header>로고 이미지</header> */}
        <div className="top">
          <h2 className="title">마이페이지</h2>
          <SettingsIcon className="setting" onClick={handleSettingsClick} />
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
      </div>
      {showProfileModify ? <Profile /> : null}
    </>
  );
}
