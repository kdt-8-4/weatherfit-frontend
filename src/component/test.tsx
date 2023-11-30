import { useState } from "react";
import axios from "axios";

interface handleSettingsClickProps {
  handleSettingsClick: () => void;
  email: string;
  name: string;
  password: string;
}

export default function Test(props: handleSettingsClickProps) {
  const { name, password } = props;

  const [nickname, setNickname] = useState<string>("");
  const [pw, setPw] = useState<string>(password);

  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPw(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (confirm("수정하시겠습니까?")) {
        const response = await axios.patch(
          `https://www.jerneithe.site/user/api/profile/modify`,
          {
            nickname: nickname,
            password: pw,
          }
        );
        console.log("회원 모달 response: ", response);
        alert("수정이 완료되었습니다.");
      }
    } catch (error) {
      console.error("회원 모달 error:", error);
    }
  };
  return (
    <div className="modal_back">
      <div className="modal_body">
        <div className="modal_content">
          <form className="modal_form" onSubmit={handleSubmit}>
            <div className="nickname_box">
              <div className="nickname_check">
                <p>닉네임</p>
                <button type="button" className="nickname_check_btn">
                  중복 확인
                </button>
              </div>
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
            <div className="pw_box">
              <p>비밀번호</p>
              <input type="password" placeholder="현재 비밀번호" />
              <input
                type="password"
                placeholder="변경 비밀번호"
                value={pw}
                onChange={handlePasswordChange}
              />
              <input type="password" placeholder="변경 비밀번호 재확인" />
            </div>
            <button
              type="button"
              className="profile_edit_btn"
              onClick={handleSubmit}
            >
              수정
            </button>
          </form>
          <button type="button">로그아웃</button>
        </div>
        <button type="button" className="user_out_btn">
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
