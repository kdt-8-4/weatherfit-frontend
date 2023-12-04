import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { FeedContent } from "@/recoilAtom/FeedContents";
import TabBar from "./TabBar";
import Image from "next/image";

interface MyPageProfileProps {
  nickname: string;
  // postnum: number;
  postData: FEEDATA[];
  userProfileImage: string | null;
}

interface IMAGE {
  boardId: number;
  imageId: number;
  imageUrl: string;
}

interface LIKE {
  likeId: number;
  nickName: string;
}

interface FEEDATA {
  boardId: number;
  images: IMAGE;
  likeCount: number;
  likelist: LIKE;
  nickName: string;
  temperature: number;
  weather: string;
  weatherIcon?: string;
}

/*
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
*/

export default function MypageProfile(props: MyPageProfileProps) {
  const { nickname, postData, userProfileImage } = props;

  const [myPostData, setMyPostData] = useState<FEEDATA[]>([]);

  useEffect(() => {
    const filteredData = postData.filter((item) => item.nickName === nickname);
    setMyPostData(filteredData);
  }, [nickname, postData]);

  return (
    <>
      <div className="user">
        <div className="user_profile">
          <div className="user_image">
            {userProfileImage == null ? (
              <AccountCircleOutlinedIcon className="user_image_icon" />
            ) : (
              <Image
                src={userProfileImage}
                alt="프로필 이미지"
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
          <p className="user_name">{nickname}</p>
        </div>
        <div className="user_info">
          <div className="num_box">
            <p className="user_post">내 게시물</p>
            <p className="user_post_num">{myPostData.length}</p>
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
