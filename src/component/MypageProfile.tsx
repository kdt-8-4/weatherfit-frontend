import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
  likelist: LIKE[];
  nickName: string;
  temperature: number;
  weather: string;
  weatherIcon?: string;
}

export default function MypageProfile(props: MyPageProfileProps) {
  const { nickname, postData, userProfileImage } = props;

  const [myPostData, setMyPostData] = useState<FEEDATA[]>([]);
  const [myLikePostData, setMyLikePostData] = useState<FEEDATA[]>([]);

  useEffect(() => {
    const filteredData = postData.filter((item) => item.nickName === nickname);
    setMyPostData(filteredData);

    const filteredLikeData = postData.filter((item) =>
      item.likelist.some((like) => like.nickName === nickname)
    );
    setMyLikePostData(filteredLikeData);
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
                width={100}
                height={100}
                className="user_image_icon"
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
            <p className="user_like_num">{myLikePostData.length}</p>
          </div>
        </div>
      </div>
      <TabBar myPostData={myPostData} myLikePostData={myLikePostData} />
    </>
  );
}
