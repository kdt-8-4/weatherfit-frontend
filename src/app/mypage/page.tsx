"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import "../../style/mypage.scss";
import "@/style/GotoLogin.scss"
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Menubar from "@/component/MenuBar";
import TabBar from "@/component/TabBar";
import ProfileModal from "@/component/ProfileModal";
import Cookies from "js-cookie";
import Link from "next/link";

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

/*
interface IMAGE {
  boardId: number;
  imageId: number;
  image_url: string;
}

interface FEEDATA {
  boardId: number;
  images: IMAGE;
  likeCount: number;
  nickName: string;
  temperature: number;
  weather: string;
}
*/

// interface userProfileType {
//   id: number;
//   email: string;
//   fromSocial: boolean;
//   image: string | null;
//   name: string;
//   nickname: string;
//   password: string;
//   phone: number | null;
//   status: boolean;
// }

export default function Mypage() {
  // 회원 정보 수정 모달
  const [showProfileModify, setShowProfileModify] = useState<boolean>(false);

  // 회원 정보
  const [userPofile, setUserProfile] = useState<any>(null);
  const [userImage, setUserImage] = useState<string | null>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string | undefined>("");

  // 로그인 확인 후 페이지 로드
  const [logincheck, setCheck] = useState<boolean>(false);
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
  }, []);

  /*
  useEffect(() => {
    const profileData = async () => {
      // 회원 정보 데이터
      try {
        // const response = await axios({
        //   method: "POST",
        //   url: `https://www.jerneithe.site/user/api/profile`,
        //   data: { email: "user91@test.com" },
        //   // headers: {
        //   //   Authorization: "weatherfit",
        //   // },
        // });

        const accessToken = Cookies.get("accessToken");
        console.log("accessToken 값: ", accessToken);

        const decodedToken = accessToken
          ? (jwt.decode(accessToken) as { [key: string]: any })
          : null;
        const decoded_nickName = decodedToken?.sub;
        console.log("디코딩", decodedToken);

        // const response = await axios({
        //   method: "POST",
        //   url: "https://www.jerneithe.site/user/api/profile",
        //   data: {
        //     email: email,
        //   },
        // });

        // const response = await axios.post(
        //   `https://www.jerneithe.site/user/api/profile`,
        //   { email: "user100@test.com" }
        // );

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


      } catch (error) {
        console.error("회원정보 에러: ", error);
      }
    };
    profileData();
  }, []);

  console.log("회원정보 Data: ", userPofile);
  */

  // ------------------------------------------------------------------------

  /*
  // board 이미지 데이터 불러오기 (my post)
  useEffect(() => {
    const postData = async () => {
      const req = await axios.get("https://www.jerneithe.site/board/list");
      const data: FEEDATA[] = req.data;
      const filteredData = data.filter((item) => item.nickName === nickname);
      console.log("filterData: ", filteredData);
      setMyPostData(filteredData);
    };
    postData();
  }, []);
  */

  // 회원 정보 수정 모달 이벤트
  const handleSettingsClick = () => {
    setShowProfileModify(!showProfileModify);
  };

  console.log("mypage의 게시물 data: ", postData);

  return (
    <>
      {logincheck ? (
        <div className="container">
          {/* header 넣을지 말지 */}
          {/* <header>로고 이미지</header> */}
          <div className="top">
            <h2 className="title">마이페이지</h2>
            <SettingsIcon className="icon" onClick={handleSettingsClick} />
          </div>
          <div className="mypage_body">
            {/* ------------- 프로필 부분 ------------- */}
            {userPofile && (
              <>
                <MypageProfile
                  nickname={nickname}
                  postData={postData}
                  userProfileImage={userImage}
                />
                {/* <MypageProfile
                  nickname={userPofile.nickname}
                  postnum={myPostData.length}
                  myPostData={myPostData}
                  userProfileImage={userImage}
                /> */}
              </>
            )}
            {/* --------------------------------------- */}
            {/* ------------- tap 부분 ------------- */}
            {/* <TabBar myPostData={myPostData} /> */}
          </div>
          <Menubar />
        </div>
      ) : (
        <>
          <br />
          <br />
          <br />
          <div id="login_msg"> 로그인을 해주세요. </div>
          <br />
          <br />
          <Link className="goto" href={"/login"}>로그인 페이지로 이동</Link>
          <br />
          <Link className="goto" href={"/"}>홈 페이지로 이동</Link>
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
        />
      )}
    </>
  );
}

// {showProfileModify && (
//   <ProfileModal
//     handleSettingsClick={handleSettingsClick}
//     email={userPofile.email}
//     name={userPofile.name}
//     password={userPofile.password}
//     userProfileImage={userImage}
//     accessToken={logintoken}
//   />
// )}
