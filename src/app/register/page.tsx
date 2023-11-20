"use client";
import CloseIcon from "@mui/icons-material/Close";
import "../../style/register.scss";
import { useState } from "react";
import InputBar from "@/component/InputBar";
import Menubar from "@/component/MenuBar";

export default function Register(): JSX.Element {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const validateEmail = (inputValue: string) => {
    const emailFormat =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return emailFormat.test(inputValue);
  };

  const validatePassword = (inputValue: string) => {
    const passwordFormat = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/;
    return passwordFormat.test(inputValue);
  };

  const validateRePassword = (inputValue: string) => {
    return inputValue === password;
  };

  const caster_register = () => {};

  return (
    <div className="container">
      <div id="x-div">
        <CloseIcon id="x" />
        <hr />
      </div>
      <section id="main">
        <p>회원가입</p>
        <form>
          {/* 이메일 👉🏻 이메일 형식 유효성 검사*/}
          <div></div>
          <InputBar
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(value: string) => setEmail(value)}
            button // 버튼을 사용한다고 명시
            buttonId="btn_verify"
            buttonText="인증"
            autoFocus
          />

          {/* 이름*/}
          <InputBar
            label="이름"
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(value: string) => setName(value)}
            autoFocus
          />
          {/* 닉네임 👉🏻 중복검사*/}
          <InputBar
            label="닉네임"
            id="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(value: string) => setNickname(value)}
            autoFocus
          />
          {/* 비밀번호 👉🏻 중복검사 & 유효성 검사*/}

          <div>
            <InputBar
              label="비밀번호"
              id="password"
              type="password"
              placeholder="비밀번호(8~20자 영문, 숫자, 특수기호 조합)"
              value={password}
              onChange={(value: string) => setPassword(value)}
              autoFocus
            />
            <InputBar
              label=""
              id="re-password"
              type="password"
              placeholder="비밀번호 확인"
              value={repassword}
              onChange={(value: string) => setRepassword(value)}
            />
          </div>
          <button id="btn_register" type="submit" onClick={caster_register}>
            옷늘 캐스터 등록
          </button>
        </form>
      </section>
      <footer>
        <span>옷늘날씨</span>
        <Menubar />
      </footer>
    </div>
  );
}
