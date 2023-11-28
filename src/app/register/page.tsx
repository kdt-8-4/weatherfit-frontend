"use client";
import CloseIcon from "@mui/icons-material/Close";
import "../../style/register.scss";
import { useState } from "react";
import InputBar from "@/component/InputBar";
import Menubar from "@/component/MenuBar";
import axios from "axios";

///////////////////////////해야하는 작업/////////////////////////////

// 희성이형하고 같이해야함
//1. 비밀번호 확인 기능
//2. 이메일 인증 전에는 데이터 전송을 해주지 않고, 이메일 전송을 통해 토큰을 받았을때만
// 회원가입 데이터를 전송해주는 기능
//3. 소셜데이터 로그인 버튼과 소셜 로그인 기능

///////////////////////////////////////////////////////////////////
export default function Register(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  console.log("========================================");
  console.log("이메일", email);
  console.log("이름", name);
  console.log("닉네임", nickname);
  console.log("비번", password);
  console.log("비번 확인", repassword);

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

  const verify_btn = async () => {
    console.log("Verify 버튼이 클릭되었습니다.");

    const verify_email = await axios({
      method: "POST",
      url: "https://www.jerneithe.site/user/profile",
      data: email,
    });
  };

  const caster_register = async () => {
    const req_regdata = {
      email,
      name,
      nickname,
      password,
      repassword,
    };

    console.log(req_regdata);

    const register_data = await axios({
      method: "POST",
      url: "https://www.jerneithe.site/user/signup",
      data: req_regdata,
    });
  };

  return (
    <>
      <div id="x-div">
        <CloseIcon id="x" />
        <hr />
      </div>
      <div className="container">
        <div className="title">
          <p>회원가입</p>
        </div>
        <section id="main">
          <form>
            {/* 이메일 👉🏻 이메일 형식 유효성 검사*/}
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
              onButtonClick={verify_btn}
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
            <button id="btn_register" type="button" onClick={caster_register}>
              옷늘 캐스터 등록
            </button>
          </form>
        </section>
      </div>
      <Menubar />
    </>
  );
}
