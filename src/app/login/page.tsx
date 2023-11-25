"use client";
import "../../style/login.scss";
import CloseIcon from "@mui/icons-material/Close";
import Menubar from "../../component/MenuBar";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  useEffect(() => {
    // 페이지 로드 시 URL에서 access_token 파싱
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get("access_token");

    // accessToken을 로컬 스토리지에 저장 또는 백엔드로 전송
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, []);

  const onGoogleSocialLogin = async () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&include_granted_scopes=true&response_type=token&redirect_uri=https%3A%2F%2Fwww.jerneithe.site%2Fuser%2Flogin%2Foauth2%2Fcode%2Fgoogle&client_id=453423602833-7db2b1dbicre47rkcrpfgn20nd16l9rs.apps.googleusercontent.com&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow";
  };

  // 일반 로그인

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const respone = await axios({
        method: "POST",
        url: `https://www.jerneithe.site/user/api/login?email=${email}&password=${pw}`,
        // headers: {
        //   Authorization: "weatherfit",
        // },
      });
      console.log("login respone: ", respone);
    } catch (error) {
      console.error("login error: ", error);
    }
  };

  const handleInputChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
    };

  return (
    <div className="container">
      <CloseIcon />
      <hr className="layout_hr" />
      <br />
      <div className="login_logobox">
        기온별 옷차림은,
        <p>옷 늘 날 씨</p>
      </div>
      <br />
      <br />
      <form className="login_form" onSubmit={handleLogin}>
        <input
          type="text"
          className="login_email"
          placeholder="이메일"
          value={email}
          onChange={handleInputChange(setEmail)}
        />
        <br />
        <input
          type="password"
          className="login_pw"
          placeholder="비밀번호"
          value={pw}
          onChange={handleInputChange(setPw)}
        />
        <br />
        <br />
        <button type="submit">로 그 인</button>
      </form>
      <br />
      <div className="login_linkbox">
        <a className="link_pw">비밀번호 찾기</a> |
        <a className="link_signup">회원가입</a>
      </div>
      <br />
      <br />
      <br />
      <div className="login_easy">
        <div>
          <hr /> 간편 로그인 <hr />
        </div>
        <button className="" onClick={onGoogleSocialLogin}>
          구글 소셜 로그인
        </button>
      </div>
      <Menubar />
    </div>
  );
}
