import axios from "axios";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FeedContent } from "@/recoilAtom/FeedContents";
import { TemMaxControl } from "@/recoilAtom/TemMax";
import { TemMinControl } from "@/recoilAtom/TemMin";
import Image from "next/image";
import "../style/feedContent.scss"


interface IMAGE{
    boardId: number;
    imageId: number;
    image_url: string;
}

interface FEEDATA {
    boardId : number;
    images : IMAGE;
    likeCount : number;
    nickName : string;
    temperature : number;
    weather : string;
}


export default function FeedContents(){
    
    const [max, setMax] = useRecoilState(TemMaxControl);
    const [min, setMin] = useRecoilState(TemMinControl);

    const [feedata, setFeedd] = useRecoilState(FeedContent);

    //최고 최저가 바뀔때마다 바뀐 온도에 맞춰 피드 바꾸기
    useEffect(() => {

        const feed_data = async() => {
            const req = await axios({
                method: "GET",
                url: "https://www.jerneithe.site/board/list",
            });
            
            console.log("받아온 데이터", req.data);

            const copy:FEEDATA[] = req.data;

            console.log("카피" ,copy);

            const filter_of_tem = copy.filter(
                (item) => item.temperature >= parseFloat(min) && item.temperature <= parseFloat(max)
            );

            console.log("필터 적용",filter_of_tem)
            
            // setFeedd(req.data);
            setFeedd(filter_of_tem);
        }

        feed_data();


    //     // const filter_feedata = feedata.filter(
    //     //     (myarr) => {
    //     //         myarr.temperature >= parseInt(min)
    //     //     }
    //     // );
    //     // console.log( "필터 데이터" ,filter_feedata);
    //     // setFeedd(filter_feedata);

    }, [max, min, setFeedd])

    
    // console.log(feedata[0].nickName);
    // console.log(feedata[0].likeCount);
    // console.log(feedata[0].images.image_url);
    // console.log(feedata[0].temperature);


    const heart_plus = async(board_id : number) => {
        console.log('리코일스테이트로 잘 들어왔는지 확인', feedata);
        console.log('하트 누른 피드의 boardId', board_id);

        //임시 하트 증가
        setFeedd((prev)=>{
            const newFeed = prev.map((myarr)=>{
                if(myarr.boardId === board_id){
                    return {...myarr, likeCount:myarr.likeCount + 1}
                }
                return myarr;
            });
            return newFeed;
        });

        //갱신된 데이터 보내야함
        //이름	유형	필수/선택
        //boardId	int	필수
        //userId	string	필수
        
        //토큰 값에 유저 아이디 넣기

        // await axios({
        //     method: "POST",
        //     url : `https://www.jerneithe.site/board/like/${board_id}`,
        //     data: { 

        //     }
        // })

    }

    return(<>
        <div className="feed_box">
            {feedata ?
            feedata.map((arr)=>{
                return( 
                <div className="feed" key={arr.boardId}>
                    <div className="feed_imgs3">
                        <Image
                            src={arr.images.image_url}
                            alt="코디 이미지"
                            className="feedOnimage"
                            width={0}
                            height={0}
                            layout="responsive"
                        />
                    </div>
                    <div className="feed_info">
                        <div id="name_like">
                            <p id="nickName_feed">@{arr.nickName}</p>
                            <div id="like_feed_dj">
                                <button onClick={() => heart_plus(arr.boardId)}>
                                <Image
                                    src="/images/likeuseFeed.svg"
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
                                    src=""
                                    alt="날씨아이콘"
                                    width={100}
                                    height={100}
                                /> */}
                            </div>
                            <div>
                            <p>{arr.temperature}℃</p>
                            </div>
                        </div>
                    </div>
                </div> )
            }) : 
            <p>로딩 중입니다. 계속 피드에 코디가 뜨지 않는다면 새로고침을 해주세요.</p>}
        </div>
    </>)
}