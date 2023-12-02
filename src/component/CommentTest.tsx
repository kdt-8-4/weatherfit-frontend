import "../style/modal_comment.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentsTest from "./CommentsTest";

interface CommentModalProps {
  handleModalToggle: () => void;
  accessToken: string | undefined;
  boardComment: boardCommentType[];
  decoded_nickName: string;
}

interface boardCommentType {
  id: number;
  boardId: number;
  nickname: string;
  content: string;
  createdDate: string;
  createdTime: string;
  replyList: replyListType[];
}

interface replyListType {
  id: number;
  content: string;
  createdDate: string;
  createdTime: string;
  nickname: string;
}

export default function CommentTest(props: CommentModalProps) {
  const { handleModalToggle, accessToken, boardComment, decoded_nickName } =
    props;

  const [boardCommentList, setBoardCommentList] = useState(
    boardComment.map((comment) => ({
      ...comment,
      isEditing: false,
      editedContent: "",
    }))
  ); // 댓글 목록

  //   const [replyList, setReplyList] = useState<replyListType[]>([]); // 답글 목록

  const [comment, setComment] = useState<string>(""); // 댓글 input
  const [reply, setReply] = useState<replyListType[]>([]); // 답글 input

  //   useEffect(() => {
  //     const replies: replyListType[] = boardCommentList.flatMap(
  //       (comment) => comment.replyList
  //     );
  //     setReplyList(replies);
  //   }, []);

  //   console.log("답글 목록: ", replyList);

  // 댓글 input 값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // 댓글 작성
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.trim() === "") {
      alert("댓글을 입력해주세요");
      return;
    }

    try {
      const comRes = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/comment/write",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: {
          boardId: 4,
          content: comment,
        },
      });

      console.log("댓글 작성 응답: ", comRes.data);

      const comResData = comRes.data;

      setBoardCommentList([
        ...boardCommentList,
        {
          id: comResData.id, // 댓글의 아이디
          boardId: comResData.boardId,
          nickname: comResData.nickname,
          content: comment,
          createdDate: comResData.createdDate,
          createdTime: comResData.createdTime,
          replyList: [],
          isEditing: false,
          editedContent: "",
        },
      ]);
      setComment("");
    } catch (err) {
      console.log("댓글 작성 에러: ", err);
    }
  };

  // 댓글 수정 버튼
  const handleEditClick = (index: number) => {
    setBoardCommentList((prevList) =>
      prevList.map((item, idx) =>
        idx === index
          ? { ...item, isEditing: true, editedContent: item.content }
          : item
      )
    );
  };

  // 댓글 수정 input
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setBoardCommentList((prevList) =>
      prevList.map((item, idx) =>
        idx === index ? { ...item, editedContent: value } : item
      )
    );
  };

  // 수정된 댓글 저장
  const handleEditSubmit = async (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    const editedComment = boardCommentList[index];
    if (editedComment.editedContent.trim() === "") {
      alert("수정 내용을 입력해주세요");
      return;
    }

    try {
      const result = await axios({
        method: "PATCH",
        url: "https://www.jerneithe.site/comment/modify",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: {
          id: editedComment.id,
          content: editedComment.editedContent,
        },
      });

      console.log("댓글 수정 응답: ", result.data);

      setBoardCommentList((prevList) =>
        prevList.map((item, idx) =>
          idx === index
            ? {
                ...item,
                content: editedComment.editedContent,
                isEditing: false,
              }
            : item
        )
      );
    } catch (err) {
      console.log("댓글 수정 에러: ", err);
    }
  };

  // 댓글 삭제
  const handleDeleteClick = async (index: number) => {
    const deletedComment = boardCommentList[index];
    console.log("댓글 삭제 deletedComment: ", deletedComment);

    try {
      const result = await axios({
        method: "DELETE",
        url: `https://www.jerneithe.site/comment/remove?commentId=${deletedComment.id}`,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      console.log("댓글 삭제 응답: ", result);

      setBoardCommentList((prevList) =>
        prevList.filter((item, idx) => idx !== index)
      );
      console.log("댓글 삭제 후: ", boardCommentList);
    } catch (err) {
      console.log("댓글 삭제 에러: ", err);
    }
  };

  return (
    <>
      <div className="modal_back">
        <div className="modal_body">
          <button onClick={handleModalToggle}>닫기</button>
          <hr />
          <div className="commentList">
            {/* 댓글 목록 */}
            {boardCommentList.map((item, index) => (
              <div key={`comment-box-${index}`} className="comment_box">
                <p key={`comment-${index}`}>
                  {item.nickname}:{" "}
                  {item.isEditing ? (
                    <input
                      type="text"
                      value={item.editedContent}
                      onChange={(e) => handleEditChange(e, index)}
                    />
                  ) : (
                    item.content
                  )}{" "}
                  ({item.createdDate})
                </p>
                {item.nickname === decoded_nickName && (
                  <>
                    {item.isEditing ? (
                      <button onClick={(e) => handleEditSubmit(e, index)}>
                        완료
                      </button>
                    ) : (
                      <button onClick={() => handleEditClick(index)}>
                        수정
                      </button>
                    )}
                    <button onClick={() => handleDeleteClick(index)}>
                      삭제
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <form className="comment_form" onSubmit={handleFormSubmit}>
            <p>{decoded_nickName}</p>
            <input
              type="text"
              placeholder="댓글을 입력하세요."
              value={comment}
              onChange={handleInputChange}
            />
            <button type="submit">게시</button>
          </form>
        </div>
      </div>
    </>
  );
}
