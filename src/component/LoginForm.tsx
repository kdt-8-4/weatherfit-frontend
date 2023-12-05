import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { Login_token } from "@/recoilAtom/Login_token";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [logintoken, setLogincheck] = useRecoilState(Login_token);
  const router = useRouter();

  const onGoogleSocialLogin = async () => {
    // try {
    //   const response = await axios({
    //     method: "POST",
    //     url: "https://accounts.google.com/o/oauth2/v2/auth?client_id=453423602833-7db2b1dbicre47rkcrpfgn20nd16l9rs.apps.googleusercontent.com&redirect_uri=https://localhost:3000&response_type=token&scope=email",
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }
    window.location.href =
      // "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=453423602833-7db2b1dbicre47rkcrpfgn20nd16l9rs.apps.googleusercontent.com&scope=email&state=FnOs2B9peyHie3pfwVOFMaqIFqlifucO4v6jmFPEc_M%3D&redirect_uri=http://localhost:3000/socialregister";
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=453423602833-7db2b1dbicre47rkcrpfgn20nd16l9rs.apps.googleusercontent.com&redirect_uri=http://localhost:3000/socialregister&response_type=token&scope=email";
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios({
        withCredentials: true,
        method: "POST",
        url: `https://www.jerneithe.site/user/login/api`,
        data: {
          email,
          password: pw,
        },
      });

      alert(`${response.data.nickname}님 환영합니다!`);

      const resData = response.data;
      console.log("resData: ", resData);
      console.log("resData token: ", resData.token);

      // 토큰을 쿠키에 저장
      document.cookie = `accessToken=${resData.token}; path=/`;
      // 이메일을 로컬 스토리지에 저장
      localStorage.setItem("user_email", resData.email);

      setToken(resData.token);
      router.push("/");
    } catch (error: any) {
      setEmail("");
      setPw("");

      console.log("error: ", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const handleInputChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setState(e.target.value);

  // Recoil로 로그인 체크할려했으나 새로고침하면 사라지는 문제가 여전히 존재해 패스
  // useEffect(()=>{
  //   const cookie = () => {
  //     const accessToken = Cookies.get("accessToken");
  //     console.log("accessToken 값: ", accessToken);
  //   }
  //   cookie();
  //   cookie();
  //   if (token === undefined) {
  //     setLogincheck(false);
  //   } else {
  //     setLogincheck(true);
  //   }
  // },[token]);

  console.log("resData token 적용됐는지: ", token);

  return (
    <>
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
        <button onClick={onGoogleSocialLogin}>구글 로그인</button>
        <hr />
        <button>카카오 로그인 </button>
      </div>
    </>
  );
}
