"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import "../../style/mypage.scss";
import "@/style/GotoLogin.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import Menubar from "@/component/MenuBar";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";

// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'; // > 아이콘
import axios from "axios";
import MypageProfile from "@/component/MypageProfile";
import jwt from "jsonwebtoken";
import ProfileModalTest from "@/component/ProfileModalTest";

interface IMAGE {
  boardId: number;
  imageId: number;
  imageUrl: string;
}

interface LIKE {
  likeId: number;
  nickName: string;
}

interface FEEDATA {
  boardId: number;
  images: IMAGE;
  likeCount: number;
  likelist: LIKE[];
  nickName: string;
  temperature: number;
  weather: string;
  weatherIcon?: string;
}

export default function Mypage() {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  // 회원 정보 수정 모달
  const [showProfileModify, setShowProfileModify] = useState<boolean>(false);

  // 회원 정보
  const [userPofile, setUserProfile] = useState<any>(null);
  const [userImage, setUserImage] = useState<string | null>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [fromSocial, setFromSocial] = useState<boolean>(false);
  const [refreshProfile, setRefreshProfile] = useState<boolean>(false);

  // 로그인 확인 후 페이지 로드
  const [logincheck, setCheck] = useState<boolean>(true);
  // 토큰 값
  const [logintoken, setToken] = useState<string | undefined>("");

  const [postData, setPostData] = useState<FEEDATA[]>([]);
  // const [myPostData, setMyPostData] = useState<FEEDATA[]>([]);
  const [email, setEmail] = useState<string | null>("");

  const cookie = () => {
    const accessToken = Cookies.get("accessToken");
    console.log("accessToken 값: ", accessToken);
    setToken(accessToken);
  };

  useEffect(() => {
    //쿠키 가져오기
    cookie();
    if (logintoken === undefined) {
      setCheck(false);
    } else {
      setCheck(true);
      setIsLoading(false);
    }

    setEmail(localStorage.getItem("user_email"));
  }, [logintoken]);

  // ------------------------------------------------------------------------

  console.log("로그인 토큰 존재 확인", logincheck);
  console.log("로그인 토큰 값", logintoken);
  console.log("유저 이메일", email);

  useEffect(() => {
    const fetchData = async () => {
      // 프로필 데이터 가져오기
      try {
        const accessToken = Cookies.get("accessToken");
        console.log("accessToken 값: ", accessToken);

        const decodedToken = accessToken
          ? (jwt.decode(accessToken) as { [key: string]: any })
          : null;
        const decoded_nickName = decodedToken?.sub;
        console.log("디코딩", decodedToken);

        const response = await axios({
          method: "POST",
          url: `https://www.jerneithe.site/user/api/profile`,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
          data: {
            email: localStorage.getItem("user_email"),
          },
        });

        setUserProfile(response.data);
        setNickname(response.data.nickname);
        setUserImage(response.data.image);
        setFromSocial(response.data.fromSocial);

        console.log("유저 data: ", response.data);
        // 게시물 데이터 가져오기
        const req = await axios.get("https://www.jerneithe.site/board/list");
        const data: FEEDATA[] = req.data;

        setPostData(data);
        // const filteredData = data.filter(
        //   (item) => item.nickName === response.data.nickname
        // );
        // console.log("filterData: ", filteredData);
        // setMyPostData(filteredData);
      } catch (error) {
        console.error("데이터 로딩 에러: ", error);
      }
    };
    fetchData();
  }, [refreshProfile]);

  // -------------------------------------------------------------

  const handleRefreshProfile = () => {
    setRefreshProfile(!refreshProfile);
  };

  // 회원 정보 수정 모달 이벤트
  const handleSettingsClick = () => {
    setShowProfileModify(!showProfileModify);
    handleRefreshProfile();
  };

  return (
    <>
      {isLoading ? ( // 로딩 중인 경우
        <div
          style={{
            height: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            className="logo"
            src="/images/logo2.svg"
            alt="옷늘날씨"
            width={200}
            height={150}
          />
          Loading...
        </div> // 로딩 화면을 표시하거나 원하는 처리를 수행할 수 있음
      ) : (
        <>
          {logincheck ? (
            <div className="container">
              {/* header 넣을지 말지 */}
              {/* <header>로고 이미지</header> */}
              <header className="header_mypage">
                <div className="top_mypage">
                  <h2 className="title">마이페이지</h2>
                  <SettingsIcon
                    className="icon"
                    onClick={handleSettingsClick}
                  />
                </div>
              </header>
              <div className="mypage_body">
                {/* ------------- 프로필 부분 ------------- */}
                {userPofile && (
                  <>
                    <MypageProfile
                      nickname={nickname}
                      postData={postData}
                      userProfileImage={userImage}
                    />
                  </>
                )}
              </div>
              <Menubar />
            </div>
          ) : (
            <>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div
                className="login_goto_box"
                style={{
                  height: "40%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <div id="login_msg" style={{ fontSize: "20px" }}>
                  {" "}
                  로그인 후에 업로드할 수 있습니다.{" "}
                </div>
                <Link className="goto" href={"/login"}>
                  로그인 페이지로 이동
                </Link>
                <Link className="goto" href={"/"}>
                  홈 페이지로 이동
                </Link>
              </div>
              <br />
            </>
          )}

          {showProfileModify && (
            <ProfileModalTest
              handleSettingsClick={handleSettingsClick}
              email={userPofile.email}
              name={userPofile.name}
              password={userPofile.password}
              userProfileImage={userImage}
              accessToken={logintoken}
              nickname={nickname}
              fromSocial={fromSocial}
            />
          )}
        </>
      )}
    </>
  );
}
