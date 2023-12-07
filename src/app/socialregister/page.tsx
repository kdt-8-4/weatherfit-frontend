"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import jwt from "jsonwebtoken";
import InputBar from "@/component/InputBar";
import Link from "next/link";
import "../../style/register.scss";
import "@/style/GotoLogin.scss";


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
  const [resEmail, setResEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const [google_signup_check, setSignUpCheck] = useState<boolean>();


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
        const resGoogle = await axios({
          method: "POST",
          url: "https://www.jerneithe.site/user/login/google",
          data: sendGoogle_data,
        });
        console.log("로그인 결과", resGoogle);
        if(resGoogle.data.nickname == null){
          setResEmail(resGoogle.data.email);
          setSignUpCheck(false);
        } else {
          setSignUpCheck(true);
        }
        setToken(resGoogle.data.token);
        
      }
      googlesenddata();
    }
  },[sendGoogle_data]);

  useEffect(()=>{
    if(token){
      document.cookie = `accessToken=${token}; path=/`;
    }
  },[token]);
  
  // console.log("받아온 토큰:", googleToken);
  // console.log("보내려고 하는 데이터", sendGoogle_data);


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

    //데이터 보내기
    const google_signup = async() => {
      console.log("이메일", resEmail);
      console.log("닉네임", nickname);
      console.log("이름", name);

      try {
        const googleLogin_final = await axios({
          method: "POST",
          url: "https://www.jerneithe.site/user/login/google/additional",
          data:{
            email: resEmail, 
            name: name,
            nickname: nickname,
          }
        });

        console.log("로그인할 유저 데이터", googleLogin_final.data);
      
      } catch (error) {
        console.log("서버에 구글 토큰을 넘겨서 받아온 데이터의 널값 채워서 다시 보내기 실패", error);
      }
      

    }

    console.log("회원가입 여부", google_signup_check);
    // console.log("받은 이메일", resEmail);
    

  return (
    <>
    {google_signup_check ? 
      <>
        <div className="title">
          <p>로그인 성공!</p>
        </div>
        <br />
        <Link className="goto" href={"/"}>홈 페이지로 이동</Link>
      </>
      :
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

              <button id="btn_register" type="button" onClick={google_signup}>
                옷늘 캐스터 등록
              </button>
            </form>
          </section>
      </div>
    }
    </>
  );
}
