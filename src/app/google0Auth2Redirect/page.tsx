import { useEffect } from "react";
import styles from "./GoogleOAuth2RedirectPage.module.css";

function GoogleOAuth2RedirectPage() {
  // 1. 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  // 2. access Token 요청
  const getToken = async (code: string) => {
    const REST_API_KEY = process.env._GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
    const SECRET_KEY = process.env.GOOGLE_SECRET_KEY;
    const response = await fetch(
      `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&client_secret=${SECRET_KEY}&code=${code}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      },
    );
    return response.json();
  };

  useEffect(() => {
    if (code) {
      getToken(code).then((res) => {
        console.log(res.access_token);
      });
    }
  }, [code]);

  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
}

export default GoogleOAuth2RedirectPage;
