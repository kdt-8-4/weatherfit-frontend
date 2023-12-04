import axios from "axios";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FeedContent } from "@/recoilAtom/FeedContents";
import { TemMaxControl } from "@/recoilAtom/TemMax";
import { TemMinControl } from "@/recoilAtom/TemMin";
import { FeedDecodeNickname } from "@/recoilAtom/FeedNickname";
import { FeedLoginToken } from "@/recoilAtom/FeedLoginToken";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../style/feedContent.scss";

interface IMAGE {
  boardId: number;
  imageId: number;
  imageUrl: string;
}

interface LIKE {
  likeId : number;
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

export default function FeedContents() {
  const [max, setMax] = useRecoilState(TemMaxControl);
  const [min, setMin] = useRecoilState(TemMinControl);
  const [feedata, setFeedd] = useRecoilState(FeedContent);
  const [decodeNick, setNick] = useRecoilState(FeedDecodeNickname);
  const [loginToken_feed, setFeedToken] = useRecoilState(FeedLoginToken);

  const router = useRouter();

  //최고 최저가 바뀔때마다 바뀐 온도에 맞춰 피드 바꾸기
  useEffect(() => {
    const feed_data = async () => {
      const req = await axios({
        method: "GET",
        url: "https://www.jerneithe.site/board/list",
      });

      console.log("받아온 데이터", req.data);

      //현재 로그인한 닉네임과 각 게시물의 likelist에 같은 닉네임이 있다면 

      const copy: FEEDATA[] = req.data;

      console.log("카피", copy);

      const filter_of_tem = copy.filter(
        (item) =>
          item.temperature >= parseFloat(min) &&
          item.temperature <= parseFloat(max),
      );

      console.log("필터 적용", filter_of_tem);

      // setFeedd(req.data);
      setFeedd(filter_of_tem);
    };

    feed_data();

    //     // const filter_feedata = feedata.filter(
    //     //     (myarr) => {
    //     //         myarr.temperature >= parseInt(min)
    //     //     }
    //     // );
    //     // console.log( "필터 데이터" ,filter_feedata);
    //     // setFeedd(filter_feedata);
  }, [max, min, setFeedd]);

  const updateLikeStatus = async (boardId : number) => {
    const url = `https://www.jerneithe.site/board/like/${boardId}`;
  
    try {
      await axios({
        method: "post",
        url: url,
        headers: { Authorization: "Bearer " + loginToken_feed },
      });
    } catch (error) {
      console.error("좋아요 변경 실패:", error);
    }
  };

  const heart_plus = async (board_id: number, isLiked:boolean) => {
    console.log("하트 누른 피드의 boardId", board_id);
    console.log("피드 상위에서 받아온 토큰", loginToken_feed);

    await updateLikeStatus(board_id);

    setFeedd((prev) => {
      const newFeed = prev.map((myarr) => {
        if (myarr.boardId === board_id) {
          const isLiked = isUserLiked(myarr.likelist, decodeNick);
          return {
            ...myarr,
            likeCount: isLiked ? myarr.likeCount - 1 : myarr.likeCount + 1,
            likelist: isLiked
              ? myarr.likelist.filter((like) => like.nickName !== decodeNick)
              : decodeNick // decodeNick이 undefined가 아닐 때만 추가
              ? [...(Array.isArray(myarr.likelist) ? myarr.likelist : []), { likeId: -1, nickName: decodeNick }]
              : myarr.likelist,
          };
        }
        return myarr;
      });
      return newFeed;
    });

    // try {
    //   await axios({
    //     method: "post",
    //     url: `https://www.jerneithe.site/board/like/${board_id}`,
    //     headers: { Authorization: "Bearer " + loginToken_feed },
    //   });
    // } catch (error) {
    //   console.error("좋아요 실패:", error);
    // }

    
  };

  const goDetail = async (board_id: number) => {
    console.log("게시글 아이디", board_id);
    localStorage.setItem("getBoardId_local", JSON.stringify(board_id));
    router.push('/detail');
  };

  // const isUserLiked = (likelist:LIKE[], userNickname:string | undefined) => {
    
  //   if (!likelist) return false;
  //   return likelist.some((like) => like.nickName === userNickname);
  //   // some: 위의 조건을 만족할 경우 순회를 중단 한다 즉, true 값을 리턴한다.
  //   // 만족 못한다면 false를 보냄
  // };

  const isUserLiked = (likelist:LIKE[] | undefined, userNickname:string | undefined) => {
    if (!likelist || !Array.isArray(likelist)) return false;
    return likelist.some((like) => like.nickName === userNickname);
  };

  console.log("리코일스테이트로 잘 들어왔는지 확인", feedata);

  return (
    <>
      <div className="feed_box">
        {feedata ? (
          feedata.map((arr) => {
            const isLiked = isUserLiked(arr.likelist, decodeNick);
            return (
              <div className="feed" key={arr.boardId}>
                <div
                  className="feed_imgs3"
                  onClick={() => goDetail(arr.boardId)}>
                  {arr.images && ( // 수정된 부분
                    <Image
                      src={arr.images.imageUrl}
                      alt="코디 이미지"
                      className="feedOnimage"
                      width={0}
                      height={0}
                      layout="responsive"
                    />
                  )}
                </div>
                <div className="feed_info">
                  <div id="name_like">
                    <p id="nickName_feed">@{arr.nickName}</p>
                    <div id="like_feed_dj">
                      <button onClick={() => heart_plus(arr.boardId, isLiked)}>
                        <Image
                          src={isLiked ? "/images/like.svg" : "/images/unLike.svg"}
                          alt="좋아요"
                          width={25}
                          height={25}
                        />
                      </button>
                      <p>{arr.likeCount}</p>
                    </div>
                  </div>
                  <div id="weather">
                    <div>
                      {/* <Image 
                          src={arr.weatherIcon}
                          alt="날씨아이콘"
                          width={100}
                          height={100}
                      /> */}
                      <img src={arr.weatherIcon} alt="날씨 아이콘">
                      </img>
                    </div>
                    <div>
                      <p>{arr.temperature}℃</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>
            로딩 중입니다. 계속 피드에 코디가 뜨지 않는다면 새로고침을 해주세요.
          </p>
        )}
      </div>
      {/* <Link href={
            pathname: '/'}>ffffffff</Link> */}
    </>
  );
}
