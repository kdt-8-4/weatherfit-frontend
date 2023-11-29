interface ReplyType {
  text: string;
  createdAt: Date;
}
interface ReplyProps {
  res: ReplyType;
  index: number;
  idx: number;
  handleEdit: (
    index: number,
    type: "comment" | "reply",
    replyIndex?: number
  ) => void;
  handleReplyDelete: (index: number, replyIndex: number) => void;
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

export default function Reply({
  res,
  index,
  idx,
  handleEdit,
  handleReplyDelete,
  getTimeDiff,
  editing,
  handleEditSubmit,
  editText,
  handleEditChange,
}: ReplyProps) {
  return (
    <>
      {editing?.index === index &&
      editing.type === "reply" &&
      editing.replyIndex === idx ? (
        <form onSubmit={handleEditSubmit}>
          <p key={`reply-${idx}`}> ㄴ답글: {res.text}</p>
          <input type="text" value={editText} onChange={handleEditChange} />
          <button type="submit">완료</button>
        </form>
      ) : (
        <p key={`reply-${idx}`}>
          ㄴ답글: {res.text} ({getTimeDiff(res.createdAt)})
          <button onClick={() => handleEdit(index, "reply", idx)}>수정</button>
          <button onClick={() => handleReplyDelete(index, idx)}>삭제</button>
        </p>
      )}
    </>
  );
}
