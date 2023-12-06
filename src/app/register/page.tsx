"use client";
import CloseIcon from "@mui/icons-material/Close";
import "../../style/register.scss";
import { useEffect, useState } from "react";
import InputBar from "@/component/InputBar";
import Menubar from "@/component/MenuBar";
import axios from "axios";
import { METHODS } from "http";

///////////////////////////해야하는 작업/////////////////////////////

// 희성이형하고 같이해야함
//1. 비밀번호 확인 기능
//2. 이메일 인증 전에는 데이터 전송을 해주지 않고, 이메일 전송을 통해 토큰을 받았을때만
// 회원가입 데이터를 전송해주는 기능
//3. 소셜데이터 로그인 버튼과 소셜 로그인 기능

///////////////////////////////////////////////////////////////////
export default function Register(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [email_code, setEmail_code] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  //중복검사
  const [emailcheck, setEmailCheck] = useState<string>("");
  const [nickname_check, setNickCHeck] = useState<string>("");

  //이메일 인증 인풋바 생성
  const [emailCertified, setCertified] = useState<boolean>(false);

  //이메일 인증이 되어야만 회원가입 데이터 전송 가능
  const [permission, setPermission] = useState<boolean>(false);
  const [permission_status, setPstatus] = useState<string>("");

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

  //이메일 중복 검사
  const check_email = async () => {
    try {
      const duplication_email = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/user/signup/email",
        data: {
          email: email,
        },
      });

      console.log(duplication_email.data.result);

      if (duplication_email.data.result) {
        setEmailCheck("");
      } else {
        setEmailCheck("사용할 수 없는 이메일입니다. 다시 입력해주세요.");
      }
    } catch (error) {
      console.log("이메일 데이터를 보내지 못했습니다", error);
    }

    console.log("onBlur 동작", email);
  };

  //닉네임 중복 검사
  const check_nickname = async () => {
    console.log("잘 동작하는지 확인", nickname);
    try {
      const duplication_nickname = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/user/signup/nickname",
        data: {
          nickname: nickname,
        },
      });

      if (duplication_nickname.data.result) {
        setNickCHeck("");
      } else {
        setNickCHeck("사용할 수 없는 닉네임입니다. 다시 입력해주세요.");
      }
    } catch (error) {
      console.log("닉네임 데이터를 보내지 못했습니다", nickname, error);
    }
  };

  //이메일 전송
  const verify_btn = async () => {
    console.log("Verify 버튼이 클릭되었습니다.");

    try {
      const verify_email = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/user/signup/email/send",
        data: { email },
      });

      console.log(verify_email.data);

      if (verify_email.data.result) {
        setCertified(true);
      } else {
        setCertified(false);
      }
    } catch (error) {
      console.log("이메일 인증 코드 전송 실패", error);
    }
  };

  //이메일 인증 코드 수신 후 전송
  const code_btn = async () => {
    try {
      const send_code = await axios({
        method: "POST",
        url: "https://www.jerneithe.site/user/signup/email/verify",
        data: {
          email: email,
          code: email_code,
        },
      });
      console.log(send_code.data);
      if (send_code.data.result) {
        setPstatus("인증 성공!");
        setPermission(true);
      } else {
        setPstatus("인증코드가 일치하지 않습니다.");
        setPermission(false);
      }

      console.log("permission", permission);
    } catch (error) {
      console.log("이메일 인증 실패", error);
    }
  };

  const caster_register = async () => {
    console.log(email, name, nickname, password);

    if (permission) {
      try {
        const register_data = await axios({
          method: "POST",
          url: "https://www.jerneithe.site/user/api/signup",
          data: {
            email: email,
            name: name,
            nickname: nickname,
            password: password,
          },
        });

        console.log("회원가입 됐는지 확인", register_data);
      } catch (error) {
        console.log("이메일 인증에 실패했기 떄문에 회원가입 불가", error);
      }
    }
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
              onBlur={check_email}
              button // 버튼을 사용한다고 명시
              buttonId="btn_verify"
              buttonText="인증"
              onButtonClick={verify_btn}
              autoFocus
            />
            <div className="permission_msg">{emailcheck}</div>

            {/* 이메일 인증 코드 입력 인풋바 */}
            {emailCertified ? (
              <InputBar
                label="이메일 인증 코드"
                id="email_code"
                type="text"
                placeholder="인증코드을 입력하세요"
                value={email_code}
                onChange={(value: string) => setEmail_code(value)}
                button // 버튼을 사용한다고 명시
                buttonId="btn_code"
                buttonText="전송"
                onButtonClick={code_btn}
                autoFocus
              />
            ) : (
              <div></div>
            )}
            <div className="permission_msg">{permission_status}</div>

            {/* 닉네임 👉🏻 중복검사*/}
            <InputBar
              label="닉네임"
              id="nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(value: string) => setNickname(value)}
              onBlur={check_nickname}
              autoFocus
            />
            <div className="permission_msg">{nickname_check}</div>

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
