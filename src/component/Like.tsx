import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LIKE {
  likeId : number;
  nickName: string;
}


export default function Like({
  boardId,
  accessToken,
  nickname,
  likelist,
  likeCount,
}: {
  boardId: number;
  accessToken: string;
  nickname: string;
  likelist: LIKE[];
  likeCount: number | undefined;
}): JSX.Element {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCountState, setLikeCountState] = useState<number>(likeCount || 0);

  // // boardId나 accessToken이 변경될 때 isLiked를 초기화
  // useEffect(() => {
  //   setIsLiked(false);
  // }, [boardId, accessToken]);

  useEffect(()=>{
    setIsLiked(isUserLiked(likelist, nickname));
  },[]);

  const updateLikeStatus = async (boardId : number) => {
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

  const isUserLiked = (likelist:LIKE[] | undefined, userNickname:string | undefined) => {
    if (!likelist || !Array.isArray(likelist)) return false;
    return likelist.some((like) => like.nickName === userNickname);
  };

  const handleLikeClick = async () => {
    try {
      await updateLikeStatus(boardId);
      setIsLiked(!isLiked);
      setLikeCountState(isLiked ? likeCountState - 1 : likeCountState + 1);
    } catch (error) {
      console.error('좋아요 변경 실패:', error);
    }
  };

  return (
    <>

      <Image
        src={isLiked ? "/images/like.svg" : "/images/unLike.svg"}
        alt="좋아요"
        width={20}
        height={20}
        onClick={handleLikeClick}
      />
      <p>{likeCountState}</p>
      {/* {isLiked ? (
        <Image
          src="/images/like.svg"
          alt="like"
          className="cursor-pointer"
          style={{ marginRight: "3px" }}
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
          style={{ marginRight: "3px" }}
          onClick={handleLikeClick}
        />
      )} */}
    </>
  );
}
