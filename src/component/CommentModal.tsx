import { useState } from "react";
import "../style/modal_comment.scss";
import Comment from "./Comment";
import Reply from "./Reply";
import axios from "axios";
import { Result } from "postcss";

// interface handleCommentClickProps {
//   handleCommentClick: () => void;
// }

interface CommentModalProps {
  handleModalToggle: () => void;
}

interface ReplyType {
  id: number;
  text: string;
  createdAt: Date;
}

interface CommentType {
  id: number;
  nickname: string;
  comment: string;
  reply: ReplyType[];
  showReplyInput: boolean;
  isDeleted: boolean;
  createdAt: Date;
}

export default function CommentModal(props: CommentModalProps) {
  const { handleModalToggle } = props;

  const [comment, setComment] = useState("");
  const [reply, setReply] = useState<ReplyType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [editing, setEditing] = useState<
    | {
        index: number;
        type: "comment" | "reply";
        replyIndex?: number;
      }
    | undefined
  >(undefined);
  const [editText, setEditText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleReplyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newReply = [...reply];
    newReply[index] = { id: 0, text: e.target.value, createdAt: new Date() };
    setReply(newReply);
  };

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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDEzOTI0NTUsImV4cCI6MTcwMTQwMzI1NSwic3ViIjoi7YWM7Iqk7YSwIn0.IW2xr6LD3aq0Wsxl1kBqce-YtxQBn4whGBAsrTDKNc0",
        },
        data: {
          boardId: 4,
          content: comment,
        },
      });

      console.log("댓글 작성 응답: ", comRes.data);

      const comResData = comRes.data;

      setComments([
        ...comments,
        {
          id: comResData.id, // 댓글 아이디
          nickname: comResData.nickname,
          comment: comment,
          reply: [],
          showReplyInput: false,
          isDeleted: false,
          createdAt: new Date(),
        },
      ]);
      setComment("");
    } catch (err) {
      console.log("댓글 작성 에러: ", err);
    }

    // 기존 코드
    // if (comment.trim() === "") {
    //   alert("댓글을 입력해주세요");
    //   return;
    // }
    // setComments([
    //   ...comments,
    //   {
    //     nickname: user.nickname,
    //     comment: comment,
    //     reply: [],
    //     showReplyInput: false,
    //     isDeleted: false,
    //     createdAt: new Date(),
    //   },
    // ]);
    // setComment("");
  };

  const handleReplySubmit = async (e: React.FormEvent, index: number) => {
    e.preventDefault();
    if (!reply[index]?.text || reply[index]?.text.trim() === "") {
      alert("답글을 입력해주세요");
      return;
    }

    try {
      const repRes = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/comment/reply",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDEzOTI0NTUsImV4cCI6MTcwMTQwMzI1NSwic3ViIjoi7YWM7Iqk7YSwIn0.IW2xr6LD3aq0Wsxl1kBqce-YtxQBn4whGBAsrTDKNc0",
        },
        data: {
          commentId: comments[index].id, // 답글을 작성할 댓글 ID
          content: reply[index].text, // 답글 내용
        },
      });

      console.log("답글 작성 응답: ", repRes.data);

      // 서버로부터 받은 답글 id를 저장함
      const newReply: ReplyType = {
        id: repRes.data.id, // 답글 id 추가
        text: reply[index].text,
        createdAt: new Date(),
      };

      comments[index].reply.push(newReply);
      setComments([...comments]);
      setReply([
        ...reply.slice(0, index),
        { id: repRes.data.id, text: "", createdAt: new Date() },
        ...reply.slice(index + 1),
      ]);
    } catch (err) {
      console.log(err);
    }

    // 기존 코드
    // comments[index].reply.push(reply[index]);
    // setComments([...comments]);
    // setReply([
    //   ...reply.slice(0, index),
    //   { text: "", createdAt: new Date() },
    //   ...reply.slice(index + 1),
    // ]);
  };

  const handleReplyClick = (index: number) => {
    const newComments = comments.map((comment, i) => {
      if (i === index) {
        comment.showReplyInput = !comment.showReplyInput;
      }
      return comment;
    });
    setComments(newComments);
  };

  const handleEdit = (
    index: number,
    type: "comment" | "reply",
    replyIndex?: number
  ) => {
    setEditing({ index, type, replyIndex });
    if (type === "comment") {
      setEditText(comments[index].comment);
    } else if (type === "reply" && replyIndex !== undefined) {
      setEditText(comments[index].reply[replyIndex].text);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 댓글 수정
    if (editing) {
      if (editing.type === "comment") {
        try {
          const comEdit = await axios({
            method: "PATCH",
            url: "https://www.jerneithe.site/comment/modify",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDEzOTI0NTUsImV4cCI6MTcwMTQwMzI1NSwic3ViIjoi7YWM7Iqk7YSwIn0.IW2xr6LD3aq0Wsxl1kBqce-YtxQBn4whGBAsrTDKNc0",
            },
            data: {
              id: comments[editing.index].id, // 수정할 댓글 ID
              content: editText, // 수정할 내용
            },
          });

          console.log("댓글 수정 결과: ", comEdit);

          comments[editing.index].comment = editText; // 상태 업데이트
          setComments([...comments]);
          setEditing(undefined);
          setEditText("");
        } catch (err) {
          console.log(err);
        }
      }

      // 답글 수정
      if (editing) {
        if (editing.type === "reply" && editing.replyIndex !== undefined) {
          try {
            const repEditRes = await axios({
              method: "PATCH",
              url: "https://www.jerneithe.site/comment/modify/reply",
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDEzOTI0NTUsImV4cCI6MTcwMTQwMzI1NSwic3ViIjoi7YWM7Iqk7YSwIn0.IW2xr6LD3aq0Wsxl1kBqce-YtxQBn4whGBAsrTDKNc0",
              },
              data: {
                id: comments[editing.index].reply[editing.replyIndex].id, // 수정할 답글 ID
                content: editText, // 수정할 내용
              },
            });

            console.log("답글 수정 결과: ", repEditRes.data);

            comments[editing.index].reply[editing.replyIndex].text = editText; // 상태 업데이트
            setComments([...comments]);
            setEditing(undefined);
            setEditText("");
          } catch (err) {
            console.log(err);
          }
        }
        // 나머지 코드...
      }
    }

    // 기존 코드
    // if (editing) {
    //   if (editing.type === "comment") {
    //     comments[editing.index].comment = editText;
    //   } else if (editing.type === "reply" && editing.replyIndex !== undefined) {
    //     comments[editing.index].reply[editing.replyIndex].text = editText;
    //   }
    //   setComments([...comments]);
    //   setEditing(undefined);
    //   setEditText("");
    // }
  };

  const handleDelete = (index: number) => {
    if (comments[index].reply.length > 0) {
      comments[index].comment = "삭제된 댓글입니다.";
      comments[index].isDeleted = true;
    } else {
      comments.splice(index, 1);
    }
    setComments([...comments]);
  };

  const handleReplyDelete = (index: number, replyIndex: number) => {
    comments[index].reply.splice(replyIndex, 1);
    setComments([...comments]);
  };

  // 시간 표시 데이터
  const getTimeDiff = (date: Date) => {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();

    const seconds = diffInMilliseconds / 1000;
    if (seconds < 60) return `${Math.floor(seconds)}초 전`;

    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;

    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;

    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  // 임시 데이터
  const user = {
    nickname: "김똥이",
  };

  // ----------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="modal_back">
        <div className="modal_body">
          <button onClick={handleModalToggle}>닫기</button>
          <hr />
          <div className="commentList">
            {comments.map((item, index) => (
              <div key={`comment-box-${index}`} className="comment_box">
                <Comment
                  key={`comment-${index}`}
                  item={item}
                  index={index}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  getTimeDiff={getTimeDiff}
                  editing={editing}
                  handleEditSubmit={handleEditSubmit}
                  editText={editText}
                  handleEditChange={handleEditChange}
                />
                {item.reply.map(
                  (res, idx) =>
                    res && (
                      <Reply
                        key={`reply-${index}-${idx}`}
                        res={res}
                        index={index}
                        idx={idx}
                        handleEdit={handleEdit}
                        handleReplyDelete={handleReplyDelete}
                        getTimeDiff={getTimeDiff}
                        editing={editing}
                        handleEditSubmit={handleEditSubmit}
                        editText={editText}
                        handleEditChange={handleEditChange}
                      />
                    )
                )}
                <button onClick={() => handleReplyClick(index)}>
                  답글 작성
                </button>
                {item.showReplyInput && (
                  <form
                    className="reply_form"
                    onSubmit={(e) => handleReplySubmit(e, index)}
                  >
                    <input
                      type="text"
                      placeholder="답글을 입력하세요."
                      value={reply[index]?.text || ""}
                      onChange={(e) => handleReplyChange(e, index)}
                    />
                    <button className="reply_btn" type="submit">
                      게시
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
          <form className="comment_form" onSubmit={handleFormSubmit}>
            <p>{user.nickname}</p>
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
