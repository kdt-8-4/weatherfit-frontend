import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LIKE {
  likeId: number;
  nickName: string;
}

export default function Like({
  boardId,
  accessToken,
  nickname,
  likelist,
  // likeCount,
  updateLikeCount,
}: {
  boardId: number;
  accessToken: string;
  nickname: string;
  likelist: LIKE[];
  // likeCount: number | undefined;
  updateLikeCount: (boardId: number, newCount: number) => void;
}): JSX.Element {
  const [isLiked, setIsLiked] = useState(false);
  // const [likeCountState, setLikeCountState] = useState<number>(likeCount || 0);

  useEffect(() => {
    setIsLiked(isUserLiked(likelist, nickname));
  }, []);

  const updateLikeStatus = async (boardId: number) => {
    const url = `https://www.jerneithe.site/board/like/${boardId}`;

    try {
      await axios({
        method: "post",
        url: url,
        headers: { Authorization: "Bearer " + accessToken },
      });
    } catch (error) {
      console.error("좋아요 변경 실패:", error);
    }
  };

  const isUserLiked = (
    likelist: LIKE[] | undefined,
    userNickname: string | undefined,
  ) => {
    if (!likelist || !Array.isArray(likelist)) return false;
    return likelist.some((like) => like.nickName === userNickname);
  };

  const handleLikeClick = async () => {
    try {
      await updateLikeStatus(boardId);
      setIsLiked(!isLiked);
      updateLikeCount(boardId, isLiked ? -1 : 1);
    } catch (error) {
      console.error("좋아요 변경 실패:", error);
    }
  };

  return (
    <>
      <Image
        src={isLiked ? "/images/like.svg" : "/images/unLike.svg"}
        alt="좋아요"
        width={25}
        height={25}
        onClick={handleLikeClick}
        style={{ cursor: "pointer" }}
      />
    </>
  );
}
