"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function CompleteProfile() {

  // const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  // const googleToken = parsedHash.get("access_token");
  
  const [googleToken, setGoogle] = useState<string | null>("");

  useEffect(()=>{
    const url = new URL(window.location.href);
    const hashParams = new URLSearchParams(url.hash.substring(1));
    const callback_token = hashParams.get("access_token");
    setGoogle(callback_token);
  },[]);

  const send = async() => {
    await axios({
              method: "POST",
              url: "https://www.jerneithe.site/user/login/google/token",
              data: {
                token: googleToken,
              },
            });
  }
  
  // useEffect(() => {
    
  //   if (googleToken) {
  //     SendToken(googleToken);
  //     console.log("useEffect : ", googleToken);
  //   }
  // }, [setGoogle, googleToken]);

  // const SendToken = async(code : string | null) => {
  //   try {
  //     if (code === null) {
  //       console.error("Authorization code is null");
  //       return;
  //     }
  //     try {
  //       const response = await axios({
  //         method: "POST",
  //         url: "https://www.jerneithe.site/user/api/token",
  //         data: {
  //           token: googleToken,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  console.log("받아온 토큰:", googleToken);


    
  
  // const [name, setName] = useState<string>("");
  // const [nickname, setNickname] = useState<string>("");
  // const router = useRouter();

  // const handleNicknameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios({
  //       method: "POST",
  //       url: "",
  //       data: {
  //         name,
  //         nickname,
  //       },
  //     });
  //     router.push("/");
  //   } catch (error) {
  //     console.error("닉네임 저장 오류:", error);
  //   }
  // };

  return (
    <div>
      <button onClick={send}>gd</button>
      {/* <h1>닉네임 설정</h1>
      <form onSubmit={handleNicknameSubmit}>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button type="submit">저장</button>
      </form> */}
    </div>
  );
}
