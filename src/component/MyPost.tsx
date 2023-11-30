import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FeedContent } from "@/recoilAtom/FeedContents";

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

export default function MyPost() {
  // const posts = [1, 2, 3, 4, 5, 6, 7];

  // const [feedata, setFeedd] = useState<any>([]);
  // const email = "user91@test.com";

  useEffect(() => {
    const feed_data = async () => {
      const req = await axios({
        method: "GET",
        url: "https://www.jerneithe.site/board/mylist",
        // url: `https://www.jerneithe.site/board/list?email=${email}`,
      });

      console.log("받아온 데이터: ", req.data);

      const copy: FEEDATA[] = req.data;

      console.log("카피: ", copy);
    };

    feed_data();
  }, []);

  return (
    <div className="post_box">
      {/* {posts.map((post, index) => (
        <div key={index} className="post">
          {post}
        </div>
      ))} */}
    </div>
  );
}
