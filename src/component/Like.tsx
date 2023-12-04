import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Like({
  boardId,
  accessToken,
}: {
  boardId: number;
  accessToken: string;
}): JSX.Element {
  const [isLiked, setIsLiked] = useState(false);

  // boardId나 accessToken이 변경될 때 isLiked를 초기화
  useEffect(() => {
    setIsLiked(false);
  }, [boardId, accessToken]);

  const handleLikeClick = async () => {
    if (isLiked) {
      // 좋아요 취소
      try {
        await axios({
          method: "DELETE",
          url: `https://www.jerneithe.site/board/like/${boardId}`,
          headers: { Authorization: "Bearer " + accessToken },
        });
        setIsLiked(false);
      } catch (error) {
        console.error("좋아요 취소 실패:", error);
      }
    } else {
      // 좋아요 추가
      try {
        await axios({
          method: "post",
          url: `https://www.jerneithe.site/board/like/${boardId}`,
          headers: { Authorization: "Bearer " + accessToken },
        });
        setIsLiked(true);
      } catch (error) {
        console.error("좋아요 실패:", error);
      }
    }
  };

  return (
    <>
      {isLiked ? (
        <Image
          src="/images/like.svg"
          alt="like"
          className="cursor-pointer"
          width={20}
          height={20}
          onClick={handleLikeClick}
        />
      ) : (
        <Image
          src="/images/unLike.svg"
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikeClick}
        />
      )}
    </>
  );
}
