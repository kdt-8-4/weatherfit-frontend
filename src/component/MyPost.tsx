import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FeedContent } from "@/recoilAtom/FeedContents";
import Image from "next/image";

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

interface MyPostProps {
  myPostData: FEEDATA[];
}

export default function MyPost(props: MyPostProps) {
  const { myPostData } = props;

  console.log("mypost 데이터: ", myPostData);

  return (
    <div className="post_box">
      {myPostData.length > 0 ? (
        myPostData.map((item) => (
          <div key={item.boardId} className="post">
            {item.images && (
              <Image
                src={item.images.imageUrl}
                alt="내 게시물 이미지"
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        ))
      ) : (
        <>
          <p>게시물을 등록해주세요.</p>
        </>
      )}
    </div>
  );
}
