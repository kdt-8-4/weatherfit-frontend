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
import { useRecoilState } from "recoil";
import CommentIcon from "@/component/CommentIcon";
import CategoryDetail from "@/component/CategoryDetail";
import { useRouter } from "next/navigation";
import { editBoardIdState } from "@/recoilAtom/EditDetail";

export default function Detail(): JSX.Element {
  const [boardDetail, setBoardDetail] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [editBoardId, setEditBoardId] = useRecoilState(editBoardIdState);

  const router = useRouter();

  const accessToken = Cookies.get("accessToken");
  console.log("accessToken 값: ", accessToken);

  const decodedToken = accessToken
    ? (jwt.decode(accessToken) as { [key: string]: any })
    : null;
  const decoded_nickName = decodedToken?.sub;
  console.log("디코딩", decodedToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://www.jerneithe.site/board/detail/${boardDetail.boardId}`,
          "https://www.jerneithe.site/board/detail/15",
        );
        setBoardDetail(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEdit = () => {
    setEditBoardId(boardDetail.boardId);
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
      <header className="top w-full flex justify-between items-center">
        <Image
          src="/images/back.svg"
          width={15}
          height={15}
          className="ml-3 cursor-pointer"
          alt="back"
          onClick={() => {
            window.history.back();
          }}
        />
        <Image
          className="mx-auto"
          src="/images/logo2.svg"
          alt="옷늘날씨"
          width={150}
          height={90}
        />
      </header>
      <hr className="w-full border-t-1" />
      <WeatherBar />
      <hr className="w-full border-t-1" />

      <section className="w-5/6 flex flex-col items-center">
        {boardDetail && (
          <>
            <div className="w-full flex items-center">
              <Profile nickName={boardDetail.nickName} />
              {decoded_nickName === boardDetail.nickName && (
                <div
                  onClick={toggleDropdown}
                  className="ml-auto flex flex-col items-center">
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
              <ImageDetail images={boardDetail.images} />
              <ContentDetail
                content={boardDetail.content}
                hashTag={boardDetail.hashTag}
              />
            </div>
            <div className="button flex">
              <Like />
              <CommentIcon />
            </div>
            <CategoryDetail category={boardDetail.category} />
          </>
        )}
      </section>

      <Menubar />
    </div>
  );
  // return (
  //   <div className="container relative">
  //     <header className="top w-full">
  //       <div className="w-full h-20 flex items-center">
  //         <Image
  //           src="/images/back.svg"
  //           width={15}
  //           height={15}
  //           className="ml-3 cursor-pointer"
  //           alt="back"
  //           onClick={() => {
  //             window.history.back();
  //           }}
  //         />
  //         <Image
  //           className="logo absolute text-center"
  //           src="/images/logo2.svg"
  //           alt="옷늘날씨"
  //           width={150}
  //           height={90}
  //         />
  //       </div>
  //       <hr className="w-full h-px" />
  //       <WeatherBar />
  //       <hr className="w-full h-px" />
  //     </header>

  //     <section className="main w-5/6 h-auto">
  //       {boardDetail && (
  //         <>
  //           <div className="w-full flex items-center">
  //             <Profile nickName={boardDetail.nickName} />
  //             {decoded_nickName === boardDetail.nickName && (
  //               <div
  //                 onClick={toggleDropdown}
  //                 className="ml-auto flex flex-col items-center">
  //                 <Image
  //                   src="/images/more.svg"
  //                   alt="etc"
  //                   width={30}
  //                   height={30}
  //                   className="cursor-pointer"
  //                 />
  //                 {dropdownVisible && (
  //                   <div className="dropdown absolute mt-7 z-10">
  //                     <button
  //                       onClick={handleEdit}
  //                       className="block w-full text-left py-2 px-4 hover:bg-gray-200 focus:outline-none">
  //                       수정
  //                     </button>
  //                     <button
  //                       onClick={handleDelete}
  //                       className="block w-full text-left py-2 px-4 hover:bg-gray-200 focus:outline-none">
  //                       삭제
  //                     </button>
  //                   </div>
  //                 )}
  //               </div>
  //             )}
  //           </div>
  //           <div className="contents w-full">
  //             <ImageDetail images={boardDetail.images} />
  //             <ContentDetail
  //               content={boardDetail.content}
  //               hashTag={boardDetail.hashTag}
  //             />
  //           </div>
  //           <div className="button flex">
  //             <Like />
  //             <CommentIcon />
  //           </div>
  //           <CategoryDetail category={boardDetail.category} />
  //         </>
  //       )}
  //     </section>

  //     <Menubar />
  //   </div>
  // );
}
