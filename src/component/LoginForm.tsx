import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { Login_token } from "@/recoilAtom/Login_token";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [token, setToken] = useRecoilState(Login_token);
  const router = useRouter();

  // useEffect(() => {
  //   // 페이지 로드 시 URL에서 access_token 파싱
  //   const urlParams = new URLSearchParams(window.location.hash.substring(1));
  //   const accessToken = urlParams.get("access_token");

  //   // accessToken을 로컬 스토리지에 저장 또는 백엔드로 전송
  //   if (accessToken) {
  //     localStorage.setItem("accessToken", accessToken);
  //   }
  // }, []);

  const onGoogleSocialLogin = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://accounts.google.com/o/oauth2/v2/auth?client_id=453423602833-7db2b1dbicre47rkcrpfgn20nd16l9rs.apps.googleusercontent.com&redirect_uri=https://localhost:3000&response_type=token&scope=email",
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    // window.location.href =
    //   "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&response_type=token&redirect_uri=https://www.jerneithe.site/user/login/oauth2/code/google&client_id=453423602833-7db2b1dbicre47rkcrpfgn20nd16l9rs.apps.googleusercontent.com";
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios({
        withCredentials: true,
        method: "GET",
        url: `https://www.jerneithe.site/user/login/api?email=${email}&password=${pw}`,
      });

      alert(`${response.data.nickname}님 환영합니다!`);

      const resData = response.data;
      console.log("resData: ", resData);
      console.log("resData token: ", resData.token);

      const accessToken = Cookies.get("accessToken");
      console.log("accessToken 값: ", accessToken);
      
      // 토큰을 쿠키에 저장
      document.cookie = `accessToken=${resData.token}; path=/`;

      setToken(resData.token);
      router.push('/');

    } catch (error: any) {
      setEmail("");
      setPw("");

      console.log("error: ", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  console.log("resData token 적용됐는지: ", token);

  const handleInputChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setState(e.target.value);

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
