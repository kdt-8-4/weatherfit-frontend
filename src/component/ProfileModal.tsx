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
  console.log("마이페이지 현재 토큰: ", accessToken);

  // 프로필 이미지
  const [image, setImage] = useState<string | null>(userProfileImage); // 프로필 이미지 상태를 관리하는 useState입니다.
  const fileInput = useRef<HTMLInputElement>(null); // file input에 접근할 수 있는 ref입니다.

  // 닉네임, 비밀번호 변경용
  const [nickname, setNickname] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // ----------------------------------------------------------------------

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          setImage(String(reader.result));
        }
      };
    }
  };

  const handleDefaultImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setImage(null); // 기본 이미지로 설정하면 userProfileImage가 null로 변경
  };

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

    let imageURL = image;

    if (image && image !== userProfileImage) {
      const formData = new FormData();
      const file = dataURLtoFile(image, "profile.jpg");
      formData.append("image", file);
      try {
        const imageRes = await axios.post("/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageURL = imageRes.data.imageURL;
      } catch (e: any) {
        console.error(e.response);
      }
    }

    if (confirm("수정하시겠습니까?")) {
      const response = await axios.patch(
        `https://www.jerneithe.site/user/api/profile/modify`,
        {
          email: email,
          nickname: nickname,
          password: newPassword,
          userProfileImage: imageURL,
        }
      );
      console.log("email: ", email);
      console.log("nickname: ", nickname);
      console.log("newPassword: ", newPassword);
      console.log("imageURL: ", imageURL);
      console.log("회원 모달 response: ", response);
      alert("수정이 완료되었습니다.");
    }

    /*
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

    if (confirm("수정하시겠습니까?")) {
      const response = await axios.patch(
        `https://www.jerneithe.site/user/api/profile/modify`,
        {
          email: email,
          nickname: nickname,
          password: newPassword,
          userProfileImage: image, // 이미지가 기본 이미지이면 null로 설정
        }
      );
      console.log("회원 모달 response: ", response);
      alert("수정이 완료되었습니다.");
    }
    */

    /*
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
    */
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    let arr = dataurl.split(","),
      mimeMatch = arr[0].match(/:(.*?);/),
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    let mime = mimeMatch ? mimeMatch[1] : "";
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
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
            <div className="user_image">
              {image ? (
                <img src={image} alt="프로필 이미지" />
              ) : (
                <AccountCircleOutlinedIcon />
              )}
              <label htmlFor="input-file">이미지 선택</label>
              <button onClick={handleDefaultImage} type="button">
                기본 이미지
              </button>
              <input
                id="input-file"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInput}
                onChange={handleImageChange}
              />
            </div>
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
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
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
