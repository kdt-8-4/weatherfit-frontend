"use client";
import { Link } from "@mui/icons-material";
import "../../style/login.scss";
import CloseIcon from "@mui/icons-material/Close";
import Menubar from "../../component/MenuBar";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");

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

    // useEffect(() => {
    //   const dataFunc = async () => {
    //     try {
    //       const respone = await axios({
    //         method: "GET",
    //         url: `https://www.jerneithe.site/user/api/login?email=${email}&password=${pw}`,
    //         // headers: {
    //         //   Authorization: "weatherfit",
    //         // },
    //       });
    //       console.log(respone);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    //   dataFunc();
    // });
  };

  const handleInputChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setState(e.target.value);

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
        <hr /> 간편 로그인 <hr />
      </div>
      <Menubar />
    </div>
  );
}
