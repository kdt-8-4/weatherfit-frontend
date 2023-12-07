"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CommentModal from "@/component/CommentModal";
import CommentTest from "./CommentTest";

interface CommentIconProps {
  accessToken: string | undefined;
  boardComment: boardCommentType[];
  decoded_nickName: string;
  localBoardId: number | null | undefined;
  handleRefreshComments: () => void;
}

interface boardCommentType {
  id: number;
  boardId: number;
  nickname: string;
  content: string;
  createdDate: string;
  createdTime: string;
  replyList: [];
  status: number;
}

export default function CommentIcon(props: CommentIconProps) {
  const {
    accessToken,
    boardComment,
    decoded_nickName,
    localBoardId,
    handleRefreshComments,
  } = props;

  console.log("아이콘 눌렀을 때 댓글: ", boardComment);

  // 댓글 모달
  const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);

  // 회원 정보 수정 모달 이벤트
  const handleCommentClick = () => {
    setShowCommentsModal(!showCommentsModal);
    handleRefreshComments();
  };

  return (
    <>
      <Image
        src="/images/comment.svg"
        alt="comment"
        width={25}
        height={25}
        className="cursor-pointer"
        onClick={handleCommentClick}
      />
      {showCommentsModal && (
        <CommentTest
          handleModalToggle={handleCommentClick}
          accessToken={accessToken}
          boardComment={boardComment}
          decoded_nickName={decoded_nickName}
          localBoardId={localBoardId}
        />
      )}
    </>
  );
}
