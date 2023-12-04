import React, { ChangeEvent, useRef, useState, FormEvent } from "react";
import "../style/modal.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import bcrypt from "bcryptjs";

// 회원 정보 수정 모달 컴포넌트

interface handleSettingsClickProps {
  handleSettingsClick: () => void;
  email: string;
  name: string;
  password: string;
  userProfileImage: string | null;
  accessToken: string | undefined;
}

export default function ProfileModal(props: handleSettingsClickProps) {
  const {
    handleSettingsClick,
    email,
    name,
    password,
    userProfileImage,
    accessToken,
  } = props;

  console.log("현재 pw: ", password);

  // 프로필 이미지
  const [selectedImage, setSelectedImage] = useState<string | null>(
    userProfileImage
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 닉네임, 비밀번호 변경용
  const [nickname, setNickname] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDefaultImageClick = () => {
    setSelectedImage(null);
  };

  /*
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
  */

  // ----------------------------------------------------------------------

  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value);
  };

  const handleCurrentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // 현재 비밀번호 확인
    const isPasswordMatch = await bcrypt.compare(currentPassword, password);

    if (!isPasswordMatch) {
      alert("현재 비밀번호를 다시 입력하세요.");
      return;
    }

    // 변경 비밀번호 확인
    if (newPassword !== confirmPassword) {
      alert("비밀번호 재확인을 다시 입력하세요.");
      return;
    }

    try {
      if (confirm("수정하시겠습니까?")) {
        const response = await axios.patch(
          `https://www.jerneithe.site/user/api/profile/modify`,
          {
            email: email,
            nickname: nickname,
            password: newPassword,
          }
        );
        console.log("회원 모달 response: ", response);
        alert("수정이 완료되었습니다.");
      }
    } catch (error) {
      console.error("회원 모달 error:", error);
    }
  };

  // -------------------------------------------------------------------------

  // 회원 탈퇴
  const handleUserDelete = async () => {
    try {
      if (confirm("정말로 탈퇴하시겠습니까?")) {
        const response = await axios({
          method: "DELETE",
          url: `https://www.jerneithe.site/user/api/profile/remove/${email}`,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        console.log("회원 탈퇴 response: ", response);
        alert("그동안 옷늘날씨를 이용해 주셔서 감사합니다.");
        window.location.href = "/";
      }
    } catch (error) {
      console.log("회원 탈퇴 err: ", error);
    }
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
            <div className="user_image">
              {selectedImage == null ? (
                <AccountCircleOutlinedIcon className="user_image_icon" />
              ) : (
                <img src={selectedImage} alt="프로필 이미지" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                이미지 선택
              </button>
              <button type="button" onClick={handleDefaultImageClick}>
                기본 이미지
              </button>
            </div>
            {/* <div className="image_box">
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
            </div> */}
            {/* <AccountCircleOutlinedIcon className="user_image" /> */}
            <div className="email_box">
              <p>이메일</p>
              <span>{email}</span>
            </div>
            <div className="name_box">
              <p>이름</p>
              <span>{name}</span>
            </div>
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
              <input
                type="password"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
              <input
                type="password"
                placeholder="변경 비밀번호"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <input
                type="password"
                placeholder="변경 비밀번호 재확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
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
        <button
          type="button"
          className="user_out_btn"
          onClick={handleUserDelete}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}

// onClick={(e: React.MouseEvent) => e.stopPropagation()}
