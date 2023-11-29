import { useState } from "react";
import "../style/modal_comment.scss";
import Comment from "./Comment";
import Reply from "./Reply";

// interface handleCommentClickProps {
//   handleCommentClick: () => void;
// }

interface CommentModalProps {
  handleModalToggle: () => void;
}

interface ReplyType {
  text: string;
  createdAt: Date;
}

interface CommentType {
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
    newReply[index] = { text: e.target.value, createdAt: new Date() };
    setReply(newReply);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") {
      alert("댓글을 입력해주세요");
      return;
    }
    setComments([
      ...comments,
      {
        nickname: user.nickname,
        comment: comment,
        reply: [],
        showReplyInput: false,
        isDeleted: false,
        createdAt: new Date(),
      },
    ]);
    setComment("");
  };

  const handleReplySubmit = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    if (!reply[index]?.text || reply[index]?.text.trim() === "") {
      alert("답글을 입력해주세요");
      return;
    }

    comments[index].reply.push(reply[index]);
    setComments([...comments]);
    setReply([
      ...reply.slice(0, index),
      { text: "", createdAt: new Date() },
      ...reply.slice(index + 1),
    ]);
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

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      if (editing.type === "comment") {
        comments[editing.index].comment = editText;
      } else if (editing.type === "reply" && editing.replyIndex !== undefined) {
        comments[editing.index].reply[editing.replyIndex].text = editText;
      }
      setComments([...comments]);
      setEditing(undefined);
      setEditText("");
    }
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
