import Image from "next/image";
import { useState } from "react";
import CommentModal from "./CommentModal";

export default function Comments(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const handleCommentClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      {showModal && <CommentModal onClose={handleCloseModal} />}
    </>
  );
}
