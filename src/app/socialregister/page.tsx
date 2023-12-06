"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import InputBar from "@/component/InputBar";
import "../../style/register.scss";
interface GOOGLEDATA{
  email: string;
  id: string;
  picture: string;
  verified_email: boolean;
}

export default function CompleteProfile() {
  
  const [googleToken, setGoogle] = useState<string | null>("");
  const [sendGoogle_data, setSendGoogle] = useState<GOOGLEDATA>();
  const [nickname_check, setNickCHeck] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [name, setName] = useState<string>("");


  useEffect(()=>{
    // const url = new URL(window.location.href);
    // const hashParams = new URLSearchParams(url.hash.substring(1));
    // const callback_token = hashParams.get("state");

    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const googleToken_url = parsedHash.get("access_token");

    setGoogle(googleToken_url);
    
  },[]);

  useEffect(()=>{
    if(googleToken){
      const send = async() => {
        const res = await axios({
          method: "GET",
          url: `https://www.googleapis.com/userinfo/v2/me?access_token=${googleToken}`,
        });
        console.log("받은 데이터", res);
        setSendGoogle(res.data);
      }
  
      send();
    }
  },[googleToken]);

  useEffect(()=>{
    if(sendGoogle_data){
      const googlesenddata = async() => {
        const sendGoogle = await axios({
          method: "POST",
          url: "https://www.jerneithe.site/user/login/google",
          data: sendGoogle_data,
        });
        console.log("로그인 결과", sendGoogle);
      }
      googlesenddata();
    }
  },[sendGoogle_data])
  
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

  // console.log("받아온 토큰:", googleToken);
  console.log("보내려고 하는 데이터", sendGoogle_data);


    //닉네임 중복 검사
    const check_nickname = async() => {
      console.log("잘 동작하는지 확인", nickname);
      try {
  
        const duplication_nickname = await axios({
          method: "POST",
          url: "https://www.jerneithe.site/user/signup/nickname",
          data: {
            nickname: nickname,
          },
        });
  
        
        if(duplication_nickname.data.result) {
          setNickCHeck("");
        } else {
          setNickCHeck("사용할 수 없는 닉네임입니다. 다시 입력해주세요.");
        }
        
      } catch (error) {
        console.log("닉네임 데이터를 보내지 못했습니다", nickname,error);
      }
  
  
    }

  return (
    <>
    <div className="container">  
      <div className="title">
          <p>Google 회원가입</p>
      </div>
      <section id="main">
          <form>
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
            <div className="permission_msg">
              {nickname_check}
            </div>

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

            <button id="btn_register" type="button">
              옷늘 캐스터 등록
            </button>
          </form>
        </section>
    </div>
    </>
  );
}
