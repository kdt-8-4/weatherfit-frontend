import "../style/modal_comment.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentsTest from "./CommentsTest";

interface CommentModalProps {
  handleModalToggle: () => void;
  accessToken: string | undefined;
  boardComment: boardCommentType[];
  decoded_nickName: string;
  localBoardId: number | null | undefined;
}

interface boardCommentType {
  id: number;
  boardId: number;
  nickname: string;
  content: string;
  createdDate: string;
  createdTime: string;
  replyList: replyListType[];
  status: number;
}

interface replyListType {
  id: number;
  content: string;
  createdDate: string;
  createdTime: string;
  nickname: string;
  isEditing: boolean;
  editedContent: string;
  status: number;
}

export default function CommentTest(props: CommentModalProps) {
  const {
    handleModalToggle,
    accessToken,
    boardComment,
    decoded_nickName,
    localBoardId,
  } = props;

  const [boardCommentList, setBoardCommentList] = useState(
    boardComment
      .filter(
        (comment) =>
          comment.status === 1 ||
          (comment.status === 0 &&
            comment.content === "삭제된 댓글입니다." &&
            comment.replyList.some((reply) => reply.status === 1))
      )
      .map((comment) => ({
        ...comment,
        replyList: comment.replyList.filter((reply) => reply.status === 1),
        isEditing: false,
        editedContent: "",
        isReplying: false,
        isReplyMode: false,
      }))
  ); // 댓글 목록

  useEffect(() => {
    console.log("댓글 목록 업데이트: ", boardCommentList);
  }, [boardCommentList]);

  console.log("새로운 댓글 목록: ", boardCommentList);

  const [comment, setComment] = useState<string>(""); // 댓글 input
  const [reply, setReply] = useState<replyListType[]>([]); // 답글 input

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
          boardId: localBoardId,
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
          status: comResData.status,
          isReplying: false,
          isReplyMode: false,
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

    console.log("댓글 수정 editedComment: ", editedComment);

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

      const newList = await Promise.all(
        boardCommentList.map(async (item, idx) => {
          // 경우 1: 해당 댓글의 답글이 없는 경우
          if (idx === index && item.replyList.length === 0) {
            return null;
          }

          // 경우 2: 해당 댓글에 replyList.status=1인 답글이 있다면 댓글의 내용이 '삭제된 댓글입니다.' 로 바뀜
          if (
            idx === index &&
            item.replyList.some((reply) => reply.status === 1)
          ) {
            const updatedComment = {
              ...item,
              content: "삭제된 댓글입니다.",
              status: 0,
            };

            // 댓글 내용 수정 API 호출
            await axios({
              method: "PATCH",
              url: "https://www.jerneithe.site/comment/modify",
              data: {
                id: updatedComment.id,
                content: updatedComment.content,
              },
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            });

            return updatedComment;
          }

          // 경우 3: 해당 댓글의 답글들의 status가 모두 0이라면 댓글도 삭제됨
          if (
            idx === index &&
            item.replyList.every((reply) => reply.status === 0)
          ) {
            return null;
          }

          return item;
        })
      );

      const filteredList = newList.filter(
        (item) => item !== null
      ) as typeof boardCommentList;
      setBoardCommentList(filteredList);

      console.log("댓글 삭제 후: ", boardCommentList);
    } catch (err) {
      console.log("댓글 삭제 에러: ", err);
    }
  };

  // ---------------------------------------------------------------------

  // 답글 작성 모드 토글
  const handleReplyModeToggle = (index: number) => {
    setBoardCommentList((prevList) =>
      prevList.map((item, idx) =>
        idx === index
          ? {
              ...item,
              isReplying: !item.isReplying,
              isReplyMode: !item.isReplyMode,
            }
          : item
      )
    );
  };

  // 답글 작성
  const handleReplySubmit = async (e: React.FormEvent, index: number) => {
    e.preventDefault();

    const replyContent = boardCommentList[index].editedContent;
    if (replyContent.trim() === "") {
      alert("답글을 입력해주세요");
      return;
    }

    try {
      const replyRes = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/comment/reply",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: {
          commentId: boardCommentList[index].id,
          content: replyContent,
        },
      });

      console.log("답글 작성 응답: ", replyRes.data);

      const replyResData = replyRes.data;

      setBoardCommentList((prevList) =>
        prevList.map((item, idx) =>
          idx === index
            ? {
                ...item,
                replyList: [
                  ...item.replyList,
                  {
                    id: replyResData.id,
                    content: replyContent,
                    createdDate: replyResData.createdDate,
                    createdTime: replyResData.createdTime,
                    nickname: replyResData.nickname,
                    isEditing: false,
                    editedContent: "",
                    status: replyResData.status,
                  },
                ],
                editedContent: "",
              }
            : item
        )
      );
    } catch (err) {
      console.log("답글 작성 에러: ", err);
    }
  };

  // 답글 수정 버튼
  const handleReplyEditClick = (commentIndex: number, replyIndex: number) => {
    setBoardCommentList((prevList) =>
      prevList.map((item, idx) =>
        idx === commentIndex
          ? {
              ...item,
              replyList: item.replyList.map((reply, idx) =>
                idx === replyIndex
                  ? { ...reply, isEditing: true, editedContent: reply.content }
                  : reply
              ),
            }
          : item
      )
    );
  };

  // 답글 수정 input
  const handleReplyEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    commentIndex: number,
    replyIndex: number
  ) => {
    const { value } = e.target;
    setBoardCommentList((prevList) =>
      prevList.map((item, idx) =>
        idx === commentIndex
          ? {
              ...item,
              replyList: item.replyList.map((reply, idx) =>
                idx === replyIndex ? { ...reply, editedContent: value } : reply
              ),
            }
          : item
      )
    );
  };

  // 답글 수정 저장
  const handleReplyEditSubmit = async (
    e: React.MouseEvent,
    commentIndex: number,
    replyIndex: number
  ) => {
    e.preventDefault();

    const editedReply = boardCommentList[commentIndex].replyList[replyIndex];
    if (editedReply.editedContent.trim() === "") {
      alert("수정 내용을 입력해주세요");
      return;
    }
    console.log("답글 수정 editedReply: ", editedReply);

    try {
      const result = await axios({
        method: "PATCH",
        url: "https://www.jerneithe.site/comment/modify/reply",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: {
          id: editedReply.id,
          content: editedReply.editedContent,
        },
      });

      console.log("답글 수정 응답: ", result);

      setBoardCommentList((prevList) =>
        prevList.map((item, idx) =>
          idx === commentIndex
            ? {
                ...item,
                replyList: item.replyList.map((reply, idx) =>
                  idx === replyIndex
                    ? {
                        ...reply,
                        content: editedReply.editedContent,
                        isEditing: false,
                      }
                    : reply
                ),
              }
            : item
        )
      );
    } catch (err) {
      console.log("답글 수정 에러: ", err);
    }
  };

  // 답글 삭제 기능
  const handleReplyDeleteClick = async (
    commentIndex: number,
    replyIndex: number
  ) => {
    const deletedReply = boardCommentList[commentIndex].replyList[replyIndex];
    console.log("답글 삭제 deletedReply: ", deletedReply);

    try {
      const result = await axios({
        method: "DELETE",
        url: `https://www.jerneithe.site/comment/remove/reply?replyId=${deletedReply.id}`,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      console.log("답글 삭제 응답: ", result);

      setBoardCommentList((prevList) =>
        prevList.map((item, idx) =>
          idx === commentIndex
            ? {
                ...item,
                replyList: item.replyList.filter(
                  (_, idx) => idx !== replyIndex
                ),
              }
            : item
        )
      );
      console.log("답글 삭제 후: ", boardCommentList);
    } catch (err) {
      console.log("답글 삭제 에러: ", err);
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
            {boardCommentList.map((comment, commentIndex) => (
              <div key={`comment-box-${commentIndex}`} className="comment_box">
                <p key={`comment-${commentIndex}`}>
                  {comment.nickname}:{" "}
                  {comment.isEditing ? (
                    <input
                      type="text"
                      value={comment.editedContent}
                      onChange={(e) => handleEditChange(e, commentIndex)}
                    />
                  ) : (
                    comment.content
                  )}{" "}
                  ({comment.createdDate})
                </p>
                {comment.nickname === decoded_nickName && (
                  <>
                    {comment.isEditing ? (
                      <button
                        onClick={(e) => handleEditSubmit(e, commentIndex)}
                      >
                        완료
                      </button>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(commentIndex)}>
                          수정
                        </button>
                      </>
                    )}
                    <button onClick={() => handleDeleteClick(commentIndex)}>
                      삭제
                    </button>
                  </>
                )}

                {/* 답글 작성 폼 및 답글 목록 */}
                <button onClick={() => handleReplyModeToggle(commentIndex)}>
                  {comment.isReplyMode ? "답글 닫기" : "답글 보기"}
                </button>
                {comment.isReplying && (
                  <div>
                    {comment.replyList.map((reply, replyIndex) => (
                      <div
                        key={`reply-box-${replyIndex}`}
                        className="reply_box"
                      >
                        <p key={`reply-${replyIndex}`}>
                          ㄴ{reply.nickname}:
                          {reply.isEditing ? (
                            <input
                              type="text"
                              value={reply.editedContent}
                              onChange={(e) =>
                                handleReplyEditChange(
                                  e,
                                  commentIndex,
                                  replyIndex
                                )
                              }
                            />
                          ) : (
                            reply.content
                          )}{" "}
                          ({reply.createdDate})
                        </p>
                        {reply.nickname === decoded_nickName && (
                          <>
                            {reply.isEditing ? (
                              <button
                                onClick={(e) =>
                                  handleReplyEditSubmit(
                                    e,
                                    commentIndex,
                                    replyIndex
                                  )
                                }
                              >
                                완료
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleReplyEditClick(commentIndex, replyIndex)
                                }
                              >
                                수정
                              </button>
                            )}
                            <button
                              onClick={() =>
                                handleReplyDeleteClick(commentIndex, replyIndex)
                              }
                            >
                              삭제
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                    <br />
                    <form
                      className="reply_form"
                      onSubmit={(e) => handleReplySubmit(e, commentIndex)}
                    >
                      <input
                        type="text"
                        placeholder="답글을 입력하세요."
                        value={comment.editedContent}
                        onChange={(e) => handleEditChange(e, commentIndex)}
                      />
                      <button type="submit">게시</button>
                    </form>
                  </div>
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
