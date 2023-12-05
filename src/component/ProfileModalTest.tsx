import React, { ChangeEvent, useRef, useState, FormEvent } from "react";
import "../style/modal.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import Image from "next/image";

// 회원 정보 수정 모달 컴포넌트

interface handleSettingsClickProps {
  handleSettingsClick: () => void;
  email: string;
  name: string;
  password: string;
  userProfileImage: string | null;
  accessToken: string | undefined;
}

export default function ProfileModalTest(props: handleSettingsClickProps) {
  const {
    handleSettingsClick,
    email,
    name,
    password,
    userProfileImage,
    accessToken,
  } = props;

  // 프로필 이미지
  const [selectedImage, setSelectedImage] = useState(null);

  // 닉네임, 비밀번호 변경용
  const [nickname, setNickname] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  //----------------------------------------------------------------------

  // 정보 수정
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

  // 파일 비동기 전송
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentPassword && newPassword && confirmPassword) {
      const isPasswordMatch = await bcrypt.compare(currentPassword, password);

      if (!isPasswordMatch) {
        alert("현재 비밀번호를 다시 입력하세요.");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("비밀번호 재확인을 다시 입력하세요.");
        return;
      }
    }

    try {
      if (confirm("수정하시겠습니까?")) {
        const formData = new FormData();
        if (selectedImage) {
          formData.append("profile", selectedImage); // 이미지 파일을 FormData에 추가
        }

        // let editInfo = {
        //     nickname: nickname,
        //     password: newPassword,
        //   }

        //   formData.append(
        //     "editInfo",
        //     new Blob([JSON.stringify(editInfo)], { type: "application/json" })
        //   );

        const response = await axios.patch(
          `수정 url`,
          { image: formData, nickname: nickname, password: newPassword },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("수정 Data:", response.data);
      }
    } catch (error) {
      console.error("이미지 업로드 에러: ", error);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleDefaultImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSelectedImage(null); // 기본 이미지로 설정하면 userProfileImage가 null로 변경
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
            {/* 프로필 이미지 부분입니다. */}
            {selectedImage ? (
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded"
                width={100}
                height={100}
              />
            ) : (
              <AccountCircleOutlinedIcon />
            )}
            {/* 파일 업로드 인풋 */}
            <input
              type="file"
              id="imageUploadInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="imageUploadInput">이미지 선택</label>
            <button onClick={handleDefaultImage} type="button">
              기본 이미지
            </button>

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
            <button type="submit" className="profile_edit_btn">
              수정
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
