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

  // 닉네임
  const [nickname, setNickname] = useState<string>("");
  // 닉네임 중복
  const [nickname_check, setNickCHeck] = useState<string>("");
  // 닉네임 중복 검사 상태
  const [nicknameChecked, setNicknameChecked] = useState(false);

  // 비밀번호
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  //----------------------------------------------------------------------

  // 정보 수정

  //닉네임 중복 검사
  const check_nickname = async () => {
    if (nickname.trim() === "") {
      // 닉네임이 빈 값인 경우
      alert("닉네임을 입력해주세요");
      return;
    }

    console.log("변경하려는 닉네임: ", nickname);

    try {
      const duplication_nickname = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/user/signup/nickname",
        data: {
          nickname: nickname,
        },
      });

      if (duplication_nickname.data.result) {
        setNickCHeck("사용할 수 있는 닉네임입니다.");
        setNicknameChecked(true); // 중복 검사를 완료한 상태로 설정
      } else {
        setNickCHeck("사용할 수 없는 닉네임입니다. 다시 입력해주세요.");
        setNicknameChecked(true); // 중복 검사를 완료했지만 사용할 수 없는 닉네임
      }
    } catch (error) {
      console.log("닉네임 데이터를 보내지 못했습니다", nickname, error);
    }
  };

  // 닉네임 수정
  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value);
  };

  // 닉네임 수정 전송
  const handleNicknameSubmit = async () => {
    if (nickname.trim() === "") {
      // 닉네임이 빈 값인 경우
      alert("닉네임을 입력해주세요");
      return;
    }

    if (!nicknameChecked) {
      alert("닉네임 중복 검사를 먼저 해주세요.");
      return;
    }

    if (nickname_check === "사용할 수 없는 닉네임입니다. 다시 입력해주세요.") {
      alert("새로운 닉네임을 다시 입력해주세요.");
      setNicknameChecked(false);
      return;
    }

    try {
      if (confirm("닉네임을 수정하시겠습니까?")) {
        const response = await axios.patch(
          `https://www.jerneithe.site/user/api/profile/modify`,
          { email: email, nickname: nickname }
        );

        console.log("닉네임 수정 Data:", response.data);
      }
    } catch (error) {
      console.error("닉네임 에러: ", error);
    }
  };

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

        formData.append("email", JSON.stringify(email));

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
          {/* 이메일과 이름 부분 */}
          <div className="fix_info_box">
            <p className="info_p">이메일: </p>
            <span className="info_span">{email}</span>
            <p className="info_p">이름: </p>
            <span className="info_span">{name}</span>
          </div>
          <hr />
          {/* 닉네임 부분 */}
          <form className="modal_nickname_edit">
            <div className="nickname_box">
              <p className="info_p">닉네임</p>
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={handleNicknameChange}
              />
              <button
                type="button"
                className="nickname_check_btn"
                onClick={check_nickname}
              >
                중복 확인
              </button>
              <div className="permission_msg">{nickname_check}</div>
            </div>
            <button
              type="button"
              className="profile_edit_btn"
              onClick={handleNicknameSubmit}
            >
              닉네임 수정
            </button>
          </form>
          <hr />
          {/* 비밀번호 부분 */}
          <form className="modal_password_edit" onSubmit={handlePasswordSubmit}>
            <div className="pw_box">
              <div>
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
          {/*  */}
        </div>
      </div>
    </div>
  );
}
