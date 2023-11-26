import { useState } from "react";

interface User {
  isLoggedIn: boolean;
}

const CommentModal = ({ onClose }: { onClose: () => void }) => {
  const [comment, setComment] = useState(""); // 댓글 상태
  const [comments, setComments] = useState<string[]>([]); // 댓글 목록 상태
  const [user, setUser] = useState<User>({ isLoggedIn: false }); // 사용자 정보

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment.trim() !== "") {
      setComments((prevComments) => [...prevComments, comment]);
      setComment(""); // 댓글 작성 후 입력 필드 초기화
    }
  };

  const handleReplySubmit =
    (parentIndex: number) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const reply = event.currentTarget.reply.value;
      if (reply.trim() !== "") {
        const updatedComments = [...comments];
        updatedComments[parentIndex] += ` (Reply: ${reply})`;
        setComments(updatedComments);
      }
    };

  // 로그인 상태 변경 시뮬레이션
  const handleLogin = () => {
    setUser({ isLoggedIn: true });
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <button className="absolute top-4 right-4" onClick={onClose}>
          Close
        </button>
        {!user.isLoggedIn ? (
          <div className="mb-4">
            <p className="text-red-500 mb-2">
              로그인 후 댓글을 작성할 수 있습니다.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleLogin}>
              로그인
            </button>
          </div>
        ) : (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="w-full h-20 p-2 border border-gray-300 rounded mb-2"
              disabled={!user.isLoggedIn} // 로그인하지 않은 경우 입력창 비활성화
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              댓글 작성
            </button>
          </form>
        )}
        <ul>
          {comments.map((c, index) => (
            <li key={index}>
              <p>{c}</p>
              {user.isLoggedIn && ( // 로그인 상태에서만 대댓글 작성 가능
                <form onSubmit={handleReplySubmit(index)}>
                  <input
                    name="reply"
                    placeholder="대댓글 입력"
                    className="border border-gray-300 rounded"
                  />
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    답글 작성
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentModal;
