import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FeedContent } from "@/recoilAtom/FeedContents";
import Image from "next/image";

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

interface MyPostProps {
  myPostData: FEEDATA[];
}

export default function MyPost(props: MyPostProps) {
  const { myPostData } = props;

  // const posts = [1, 2, 3, 4, 5, 6, 7];

  // const [feedata, setFeedd] = useState<any>([]);
  // const email = "user91@test.com";

  return (
    <div className="post_box">
      {/* {myPostData.map((item) => (
        <div key={item.boardId} className="post">
          {item.images ? (
            <Image
              src={item.images.image_url}
              alt="코디 이미지"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <>
              <p>게시물을 등록해주세요.</p>
            </>
          )}
        </div>
      ))} */}
    </div>
  );
}
