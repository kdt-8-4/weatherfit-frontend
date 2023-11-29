"use client";
import React, { useState } from "react";
import Image from "next/image";
import CommentModal from "@/component/CommentModal";

export default function CommentIcon() {
  // 댓글 모달
  const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);

  // 회원 정보 수정 모달 이벤트
  const handleCommentClick = () => {
    setShowCommentsModal(!showCommentsModal);
  };

  return (
    <>
      <Image
        src="/images/comment.svg"
        alt="comment"
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={handleCommentClick}
      />
      {showCommentsModal && (
        <CommentModal handleModalToggle={handleCommentClick} />
      )}
    </>
  );
}
