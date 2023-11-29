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

interface CommentProps {
  item: CommentType;
  index: number;
  handleEdit: (
    index: number,
    type: "comment" | "reply",
    replyIndex?: number
  ) => void;
  handleDelete: (index: number) => void;
  getTimeDiff: (date: Date) => string;
  editing?: {
    index: number;
    type: "comment" | "reply";
    replyIndex?: number;
  };
  handleEditSubmit: (e: React.FormEvent) => void;
  editText: string;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Comment({
  item,
  index,
  handleEdit,
  handleDelete,
  getTimeDiff,
  editing,
  handleEditSubmit,
  editText,
  handleEditChange,
}: CommentProps) {
  return (
    <div key={index}>
      {editing?.index === index && editing.type === "comment" ? (
        <form onSubmit={handleEditSubmit}>
          <p key={`comment-${index}`}>{item.nickname}:</p>
          <input type="text" value={editText} onChange={handleEditChange} />
          <button type="submit">완료</button>
        </form>
      ) : (
        <p key={`comment-${index}`}>
          {item.nickname}: {item.isDeleted ? item.comment : item.comment} (
          {getTimeDiff(item.createdAt)})
          {!item.isDeleted && (
            <>
              <button onClick={() => handleEdit(index, "comment")}>수정</button>
              <button onClick={() => handleDelete(index)}>삭제</button>
            </>
          )}
        </p>
      )}
    </div>
  );
}
