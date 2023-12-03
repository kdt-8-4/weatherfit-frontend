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

interface boardCommentType {
  id: number;
  boardId: number;
  nickname: string;
  content: string;
  createdDate: string;
  createdTime: string;
  replyList: [];
}

export default function Detail(): JSX.Element {
  const [boardDetail, setBoardDetail] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [localBoardId, setLocalBoardId] = useState<number | null>(0);
  const [editBoardId, setEditBoardId] = useRecoilState(editBoardIdState);
  const [comment, setComment] = useState<boardCommentType[]>([]);

  const router = useRouter();

  const accessToken = Cookies.get("accessToken");
  console.log("accessToken 값: ", accessToken);

  const decodedToken = accessToken
    ? (jwt.decode(accessToken) as { [key: string]: any })
    : null;
  const decoded_nickName = decodedToken?.sub;
  console.log("디코딩", decodedToken);

  useEffect(() => {
    //여기서 localStorae의 값을 가져와 정수로 바꾸기
    const boardId_in = localStorage.getItem("getBoardId_local");
    const boardIdNumber = boardId_in ? parseInt(boardId_in) : null;
    setLocalBoardId(boardIdNumber);

    console.log("정수 변환", boardIdNumber);
    console.log("로컬에서 불러온 아이읻", localBoardId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.jerneithe.site/board/detail/${localBoardId}`,
          // `https://www.jerneithe.site/board/detail/3`,
        );
        console.log("detail response: ", response.data);
        console.log("댓글: ", response.data.comments);
        setBoardDetail(response.data);
        setComment(response.data.comments);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [localBoardId, setLocalBoardId]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEdit = () => {
    // setEditBoardId(boardDetail.boardId);
    setEditBoardId(localBoardId);
    router.push(`/detail/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      try {
        const response = await axios({
          method: "DELETE",
          url: `https://www.jerneithe.site/board/delete/${boardDetail.boardId}`,
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

  return (
    <div className="container flex flex-col items-center">
      <header className="w-full">
        <div className="top">
          <div className="flex items-center">
            <Image
              src="/images/back.svg"
              width={15}
              height={15}
              className="ml-2.5 cursor-pointer"
              alt="back"
              onClick={() => {
                window.history.back();
              }}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              className="mx-auto mb-2.5"
              src="/images/logo2.svg"
              alt="옷늘날씨"
              width={150}
              height={90}
            />
          </div>
        </div>
        <hr className="w-full border-t-1" />
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
                <div className="button flex w-full px-3">
                  <Like />
                  <CommentIcon
                    accessToken={accessToken}
                    boardComment={comment}
                    decoded_nickName={decoded_nickName}
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
