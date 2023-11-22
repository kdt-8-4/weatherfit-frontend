"use client";
import { Link } from "@mui/icons-material";
import "../../style/login.scss";
import CloseIcon from "@mui/icons-material/Close";
import Menubar from "../../component/MenuBar";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// 임시 데이터
const userData = {
  email: "testuser",
  pw: "testPw",
  name: "테스트",
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const respone = await axios({
        method: "GET",
        url: "13.124.197.227:8080/user/api/login?email=user100@test.com&password=1234",
        headers: {
          Authorization: "weatherfit",
        },
      });

      /*
      const res = await axios.post("/user/signin", { email, pw });

      // 응답 상태 코드가 200이면 로그인 성공
      if (res.status === 200) {
        alert(`${res.data.ninkname}님 반갑습니다!`);
        router.push("/"); // 로그인 성공 후 메인으로 이동
      } else {
        // 로그인 실패 시 서버에서 보낸 에러 메시지를 출력
        alert(res.data.message);
      }
      */

      /*
      // if (email === userData.email && pw === userData.pw) {
      //   alert(`${userData.name}님 반갑습니다!`);
      //   router.push("/"); // 로그인 성공 후 메인으로 이동
      // } else if (email === userData.email && pw != userData.pw) {
      //   alert("비밀번호가 틀렸습니다.");
      // } else if (email != userData.email && pw === userData.pw) {
      //   alert("아이디가 틀렸습니다.");
      // } else {
      //   alert("로그인에 실패하였습니다.");
      // }
      */
    } catch (error) {
      console.error(error);
    }
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
