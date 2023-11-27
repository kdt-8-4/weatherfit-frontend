import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Login_token } from "@/recoilAtom/Login_token";
import { useRecoilState } from "recoil";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [token, setToken] = useRecoilState(Login_token);

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
    try {
      const response = await axios({
        method: "GET",
        url: "https://jerneithe.site/user/social/login/google",
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: `https://www.jerneithe.site/user/api/login?email=${email}&password=${pw}`,
        // headers: {
        //   Authorization: "weatherfit",
        // },
      });

      alert(`${response.data.nickname}님 환영합니다!`);

      const resData = response.data;
      console.log("resData: ", resData);
      console.log("resData token: ", resData.token);
      setToken(resData.token);
      router.push("/upload");
      // router.push("/"); // 로그인 성공시 메인페이지로 이동
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
      </div>
    </>
  );
}
