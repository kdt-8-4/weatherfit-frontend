import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// 회원 정보 수정 모달 컴포넌트

interface handleSettingsClickProps {
  handleSettingsClick: () => void;
}

export default function ProfileModal(props: handleSettingsClickProps) {
  // 전달받은 state 함수
  const { handleSettingsClick } = props;

  return (
    <div className="modal_back">
      <div className="modal_content">
        <h2>회원정보 수정</h2>
        <button onClick={handleSettingsClick}>닫기</button>
        <AccountCircleOutlinedIcon className="user_image" />
        <input placeholder="닉네임" />
        <input placeholder="비밀번호" />
      </div>
      <button type="button">수정</button>
      <button type="button">로그아웃</button>
    </div>
  );
}

// onClick={(e: React.MouseEvent) => e.stopPropagation()}
