"use client";

import FeedSearch from "@/component/FeedSearch";
import WeatherBar from "@/component/WeatherBar";
import FeedCategory from "@/component/FeedCategory";
import FeedContenets from "@/component/FeedContents";
import Menubar from "@/component/MenuBar";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";

import '../../style/feed.scss';

import { FeedDecodeNickname } from "@/recoilAtom/FeedNickname";
import { FeedLoginToken } from "@/recoilAtom/FeedLoginToken";


export default function Feed(){
    const [decodeNick, setNick] = useRecoilState(FeedDecodeNickname);
    const [loginToken_feed, setFeedToken] = useRecoilState(FeedLoginToken);

    useEffect(()=>{
        const accessToken = Cookies.get("accessToken");
        // console.log("accessToken 값: ", accessToken);
        const decodedToken = accessToken
        ? (jwt.decode(accessToken) as { [key: string]: any })
        : null;
        const decoded_nickName = decodedToken?.sub;
        // console.log("디코딩", decodedToken);
        console.log("디코딩 닉네임", decoded_nickName);

        setFeedToken(accessToken);
        setNick(decoded_nickName);

    },[])

    return(<>
    {/* <RecoilRoot> */}
        <div className="container_dj">
            <br />
            <FeedSearch />
            <hr />
            <WeatherBar />
            <FeedCategory />
            <FeedContenets />
            <Menubar />

        </div>
    {/* </RecoilRoot> */}
    </>)
}
