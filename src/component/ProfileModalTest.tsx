import React, { ChangeEvent, useRef, useState, FormEvent } from "react";
import "../style/modal.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import Image from "next/image";
import { colors } from "@mui/material";

// 회원 정보 수정 모달 컴포넌트

interface handleSettingsClickProps {
  handleSettingsClick: () => void;
  email: string;
  name: string;
  password: string;
  userProfileImage: string | null;
  accessToken: string | undefined;
  nickname: string;
  fromSocial: boolean;
}

export default function ProfileModalTest(props: handleSettingsClickProps) {
  const {
    handleSettingsClick,
    email,
    name,
    password,
    userProfileImage,
    accessToken,
    nickname,
    fromSocial
  } = props;

  // 프로필 이미지
  const [selectedImage, setSelectedImage] = useState(null);

  // 비밀번호
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  //----------------------------------------------------------------------

  // 정보 수정

  // 비밀번호 수정
  const handleCurrentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword) {
      // 현재 비밀번호가 빈 값인 경우
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, password);
    if (!isPasswordMatch) {
      // 현재 비밀번호가 일치하지 않는 경우
      alert("현재 비밀번호를 다시 입력하세요.");
      return;
    }

    if (newPassword === "") {
      // 새로운 비밀번호가 빈 값인 경우
      alert("새로운 비밀번호를 입력해주세요.");
      return;
    }

    if (!confirmPassword || newPassword !== confirmPassword) {
      // 비밀번호 재확인이 빈 값이거나, 새로운 비밀번호와 재확인 비밀번호가 일치하지 않는 경우
      alert("비밀번호 재확인을 다시 입력하세요.");
      return;
    }

    try {
      if (confirm("비밀번호를 수정하시겠습니까?")) {
        const response = await axios.patch(
          `https://www.jerneithe.site/user/api/profile/modify`,
          { email: email, password: newPassword }
        );

        console.log("비밀번호 수정 Data:", response.data);
      }
    } catch (error) {
      console.error("비밀번호 수정 에러: ", error);
    }
  };

  // 파일 비동기 전송
  const handleImageSubmit = async () => {
    // e.preventDefault();
    try {
      if (confirm("이미지를 수정하시겠습니까?")) {
        const formData = new FormData();
        if (selectedImage) {
          formData.append("image", selectedImage); // 이미지 파일을 FormData에 추가
        }

        formData.append("email", email);

        // formData.append("email", JSON.stringify(email));

        // formData.append(
        //   "email",
        //   new Blob([JSON.stringify(email)], { type: "application/json" })
        // );

        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const response = await axios.patch(
          `https://www.jerneithe.site/user/api/profile/modify/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("이미지 수정 Data:", response.data);
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

  // -------------------------------------------------------------------------

  // 로그아웃
  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      Cookies.remove("accessToken"); // 쿠키에 로그인 토큰 삭제
      console.log("로그아웃 후 쿠키 확인: ", accessToken);
      alert("로그아웃 되었습니다.");
      window.location.href = "/";
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
        Cookies.remove("accessToken"); // 쿠키에 로그인 토큰 삭제
        alert("그동안 옷늘날씨를 이용해 주셔서 감사합니다.");
        window.location.href = "/";
      }
    } catch (error) {
      console.log("회원 탈퇴 err: ", error);
    }
  };

  // -------------------------------------------------------------------------

  return (
    <div className="modal_back">
      <div className="modal_body">
        <div className="top">
          <h2 className="title">회원정보 수정</h2>
          <CloseIcon className="icon" onClick={handleSettingsClick} />
        </div>
        <div className="modal_content">
          {/* 프로필 이미지 부분입니다. */}
          <div className="profile_image_box">
            {/* <form className="modal_image_edit" onSubmit={handleImageSubmit}> */}
            <div className="profile_image">
              {selectedImage ? (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded"
                  width={100}
                  height={100}
                  className="profile_image_icon_1"
                />
              ) : (
                <AccountCircleOutlinedIcon className="profile_image_icon_2" />
              )}
            </div>
            {/* 파일 업로드 인풋 */}
            <div className="profile_select_box">
              <input
                type="file"
                id="imageUploadInput"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="imageUploadInput" className="profile_select_btn">
                이미지 선택
              </label>
              |
              <button
                onClick={handleDefaultImage}
                type="button"
                className="profile_select_btn"
              >
                기본 이미지
              </button>
            </div>
            <button
              type="submit"
              className="profile_edit_btn"
              onClick={handleImageSubmit}
            >
              이미지 수정
            </button>
            {/* </form> */}
          </div>
          <hr />
          {/* 이메일, 이름, 닉네임 부분 */}
          <div className="fix_info">
            <div className="fix_info_box">
              <p className="info_p">이메일: </p>
              <span className="info_span">&nbsp;{email}</span>
            </div>
            <div className="fix_info_box">
              <p className="info_p">이름: </p>
              <span className="info_span">&nbsp;{name}</span>
            </div>
            <div className="fix_info_box">
              <p className="info_p">닉네임: </p>
              <span className="info_span">&nbsp;{nickname}</span>
            </div>
          </div>
          <hr />
          {/* 비밀번호 부분 */}
          <form className="modal_password_edit" onSubmit={handlePasswordSubmit}>
            <div className="pw_box">
              <div className="fix_info_box">
                <p className="info_p">비밀번호</p>
                <p>(8~20자 영문, 숫자, 특수기호 조합)</p>
              </div>
              <div className="pw_input_box">
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
            </div>
            <button type="submit" className="profile_edit_btn">
              비밀번호 수정
            </button>
          </form>
          <hr />
          {/* 로그아웃 부분 */}
          <button type="button" className="logout_btn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
        {/* 회원탈퇴 부분 */}
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
