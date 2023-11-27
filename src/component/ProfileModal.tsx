import { ChangeEvent, useRef, useState, FormEvent } from "react";
import "../style/modal.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";

// 회원 정보 수정 모달 컴포넌트

interface handleSettingsClickProps {
  handleSettingsClick: () => void;
}

export default function ProfileModal(props: handleSettingsClickProps) {
  // 전달받은 state 함수
  const { handleSettingsClick } = props;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const defaultIcon = (
    <AccountCircleOutlinedIcon
      className="user_image"
      onClick={() => imageInputRef.current?.click()}
    />
  );
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // form 데이터를 저장하는 코드를 여기에 작성합니다.
  };

  return (
    <div className="modal_back">
      <div className="modal_body">
        <div className="top">
          <h2 className="title">회원정보 수정</h2>
          <CloseIcon className="icon" onClick={handleSettingsClick} />
        </div>
        <div className="modal_content">
          <form className="modal_form" onSubmit={handleSubmit}>
            <div className="image_box">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="User"
                  className="user_image"
                  onClick={() => imageInputRef.current?.click()}
                />
              ) : (
                defaultIcon
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={imageInputRef}
                style={{ display: "none" }}
              />

              <button type="button" onClick={handleReset}>
                기본 이미지
              </button>
            </div>
            {/* <AccountCircleOutlinedIcon className="user_image" /> */}
            <div className="email_box">
              <p>이메일</p>
              <span>test1@test.com</span>
            </div>
            <div className="name_box">
              <p>이름</p>
              <span>김똥이</span>
            </div>
            <div className="nickname_box">
              <div className="nickname_check">
                <p>닉네임</p>
                <button type="button" className="nickname_check_btn">
                  중복 확인
                </button>
              </div>
              <input type="text" placeholder="닉네임" />
            </div>
            <div className="pw_box">
              <p>비밀번호</p>
              <input type="password" placeholder="현재 비밀번호" />
              <input type="password" placeholder="변경 비밀번호" />
              <input type="password" placeholder="변경 비밀번호 재확인" />
            </div>
            <button type="button" className="profile_edit_btn">
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

// onClick={(e: React.MouseEvent) => e.stopPropagation()}
