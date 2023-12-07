"use client";

import WeatherBar from "@/component/WeatherBar";
import Image from "next/image";
import "../../style/detail.scss";
import Menubar from "@/component/MenuBar";
import Profile from "@/component/Profile";
import ImageDetail from "@/component/ImageDetail";
import Like from "@/component/Like";
import { useEffect, useState } from "react";
import axios from "axios";
import ContentDetail from "@/component/ContentDetail";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useRecoilState, useRecoilValue } from "recoil";
import CommentIcon from "@/component/CommentIcon";
import CategoryDetail from "@/component/CategoryDetail";
import { useRouter } from "next/navigation";
import { editBoardIdState } from "@/recoilAtom/EditDetail";
import { ProfileTemperature } from "@/recoilAtom/ProfileTemperature";
import Link from "next/link";

interface boardCommentType {
  id: number;
  boardId: number;
  nickname: string;
  content: string;
  createdDate: string;
  createdTime: string;
  replyList: [];
  status: number;
}

interface LIKE {
  likeId: number;
  nickName: string;
}

export default function Detail(): JSX.Element {
  const [boardDetail, setBoardDetail] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [localBoardId, setLocalBoardId] = useState<number | null | undefined>();
  const [editBoardId, setEditBoardId] = useRecoilState(editBoardIdState);
  const [comment, setComment] = useState<boardCommentType[]>([]);
  const [refreshComments, setRefreshComments] = useState(false);
  const [likelist, setLikelist] = useState<LIKE[]>([]);
  const [profile_temperature, setProfileTemperature] = useRecoilState(ProfileTemperature);
  // const [likeCount, setLikeCount] = useState<number>();
  const [likeCount, setLikeCount] = useState(0);
  // 좋아요 개수 업데이트 함수
  const updateLikeCount = (boardId: number, newCount: number) => {
    setLikeCount((prevCount) => prevCount + newCount);
  };


  const router = useRouter();
  const accessToken = Cookies.get("accessToken");

  const decodedToken = accessToken
    ? (jwt.decode(accessToken) as { [key: string]: any })
    : null;
  const decoded_nickName = decodedToken?.sub;

  useEffect(() => {
    const boardId_in = localStorage.getItem("getBoardId_local");
    const boardIdNumber = boardId_in ? parseInt(boardId_in) : null;
    setLocalBoardId(boardIdNumber);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!localBoardId) return;
      try {
        const response = await axios.get(
          `https://www.jerneithe.site/board/detail/${localBoardId}`,
        );
        // console.log("디테일 응답", response);
        setLikelist(response.data.likelist);
        setLikeCount(response.data.likeCount);
        setBoardDetail(response.data);
        setComment(response.data.comments);
        setProfileTemperature(response.data.temperature);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [localBoardId, setLocalBoardId, refreshComments]);

  const handleClick = () => {
    router.push("/");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEdit = () => {
    setEditBoardId(localBoardId);
    router.push(`/detail/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      try {
        const response = await axios({
          method: "DELETE",
          url: `https://www.jerneithe.site/board/delete/${localBoardId}`,
          headers: { Authorization: "Bearer " + accessToken },
        });
        console.log(response.data.result);
        alert("게시물이 삭제되었습니다");
        window.location.href = "/feed";
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  console.log("보낼 좋아요 카운트와 리스트", likeCount, likelist);

  return (
    <div className="container flex flex-col items-center">
      <header className="w-full">
        <div className="top">
          <div className="flex items-center">
            <Image
              src="/images/back.svg"
              width={13}
              height={13}
              className="back ml-2.5 cursor-pointer"
              alt="back"
              onClick={() => {
                window.history.back();
              }}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              className="mx-auto mb-2.5 cursor-pointer"
              src="/images/logo2.svg"
              alt="옷늘날씨"
              width={150}
              height={90}
              onClick={handleClick}
            />
          </div>
        </div>
        {/* <hr className="w-full border-t-1" /> */}
        <WeatherBar />
        <hr className="w-full border-t-1" />
      </header>

      <section
        className="main flex flex-col items-center"
        style={{ width: "70%" }}>
        {boardDetail && (
          <>
            <div className="w-full flex items-center">
              <Profile nickName={boardDetail.nickName} />
              {decoded_nickName === boardDetail.nickName && (
                <div
                  onClick={toggleDropdown}
                  className="ml-auto flex flex-col items-center p-3">
                  <Image
                    src="/images/more.svg"
                    alt="etc"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                  {dropdownVisible && (
                    <div className="dropdown absolute mt-7 z-10">
                      <button
                        onClick={handleEdit}
                        className="block w-full text-left py-2 px-4 hover:bg-gray-200 focus:outline-none">
                        수정
                      </button>
                      <button
                        onClick={handleDelete}
                        className="block w-full text-left py-2 px-4 hover:bg-gray-200 focus:outline-none">
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="contents w-full">
              <div className="w-full">
                <ImageDetail images={boardDetail.images} />
                <p className="pl-3 pb-2" style={{ color: "gray" }}>
                  좋아요 <span style={{ color: "" }}>{likeCount}</span>개
                </p>
                <div className="button flex w-full px-3">
                  <Like
                    boardId={localBoardId || 0}
                    accessToken={accessToken || ""}
                    nickname={decoded_nickName}
                    likelist={likelist}
                    updateLikeCount={updateLikeCount}
                  />
                  <CommentIcon
                    accessToken={accessToken}
                    boardComment={comment}
                    decoded_nickName={decoded_nickName}
                    localBoardId={localBoardId}
                    handleRefreshComments={() =>
                      setRefreshComments(!refreshComments)
                    }
                  />
                </div>
              </div>
              <ContentDetail
                content={boardDetail.content}
                hashTag={boardDetail.hashTag}
              />
            </div>
            <CategoryDetail category={boardDetail.category} />
          </>
        )}
      </section>

      <Menubar />
    </div>
  );
}
