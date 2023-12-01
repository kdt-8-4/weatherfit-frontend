import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { FeedContent } from "@/recoilAtom/FeedContents";
import TabBar from "./TabBar";

interface MyPageProfileProps {
  nickname: string;
  postnum: number;
  myPostData: FEEDATA[];
}

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

export default function MypageProfile(props: MyPageProfileProps) {
  const { nickname, postnum, myPostData } = props;

  return (
    <>
      <div className="user">
        <div className="user_profile">
          <AccountCircleOutlinedIcon className="user_image" />
          <p className="user_name">{nickname}</p>
        </div>
        <div className="user_info">
          <div className="num_box">
            <p className="user_post">내 게시물</p>
            <p className="user_post_num">{postnum}</p>
          </div>
          <div className="num_box">
            <p className="user_like">좋아요 한 게시물</p>
            <p className="user_like_num">10</p>
          </div>
        </div>
      </div>
      <TabBar myPostData={myPostData} />
    </>
  );
}
