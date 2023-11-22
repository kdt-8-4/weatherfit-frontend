"use client";
import { useState } from "react";
import Image from "next/image";
import "../../style/mypage.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import GridOnTwoToneIcon from "@mui/icons-material/GridOnTwoTone";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Menubar from "@/component/MenuBar";
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'; // > 아이콘

export default function Mypage() {
  const [liked, setLiked] = useState<boolean>(false);
  const [grid, setGrid] = useState<boolean>(false);

  const handleGridClick = () => {
    setGrid(!grid);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="container">
      {/* header 넣을지 말지 */}
      {/* <header>로고 이미지</header> */}
      <p className="title">마이페이지</p>
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
        {/* ------------- tab 부분 ------------- */}
        <div className="tab_bar">
          {grid ? (
            <GridOnTwoToneIcon
              className="icon click_icon"
              onClick={handleGridClick}
            />
          ) : (
            <GridOnOutlinedIcon className="icon" onClick={handleGridClick} />
          )}
          {liked ? (
            <FavoriteIcon
              className="icon click_icon"
              onClick={handleLikeClick}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              className="icon"
              onClick={handleLikeClick}
            />
          )}
        </div>
        {/* --------------------------------------- */}
        {/* ------------- post 부분 ------------- */}
        <div className="post_box">
          <div className="post">1</div>
          <div className="post">2</div>
          <div className="post">3</div>
          <div className="post">4</div>
          <div className="post">5</div>
          <div className="post">6</div>
          <div className="post">7</div>
          <div className="post">8</div>
        </div>
      </div>
      <Menubar />
    </div>
  );
}
