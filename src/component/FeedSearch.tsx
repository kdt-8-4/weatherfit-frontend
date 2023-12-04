import { ChangeEventHandler, useState } from "react";
import axios from "axios";
import Image from "next/image";
import "../style/feedSearch.scss";

import { useRecoilState } from "recoil";
import { FeedSearchdata } from "@/recoilAtom/FseahData";
import { FeedContent } from "@/recoilAtom/FeedContents";



interface SEARCH {
    categoryT: string;
    serch_data: string[];
}

export default function FeedSearch(){

    const [catesearch, setCateSearch] = useRecoilState(FeedSearchdata);
    console.log("검색할 카테고리 데이터", catesearch);
    const [feedata, setFeedd] = useRecoilState(FeedContent);

    const [hash_value, setHval] = useState<string>("");

    const handleInputChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setHval(e.target.value); // 입력 값 업데이트
    };

    // console.log("인풋 입력값", hash_value);

    //검색 아이콘 누르면 선택한 카테고리 데이터가 있는 아톰에서 배열들을 가져오고
    //해시태그에 있는 스트링을 # 기준으로 나누어 배열에 넣은 뒤에
    //모두 합쳐서 백엔드로 보내면 됨
    const search_final = async() => {
        //카테고리 검색 데이터 하나의 배열로 합치기
        const search_category_Data = catesearch.flatMap((myarr) => myarr.serch_data);
        console.log('합친 카테고리 검색 배열', search_category_Data);

        //해시태그 검샏 데이터 #을 기준으로 나누어 배열 형성
        const search_hashtag_Data = hash_value.split('#').filter(Boolean);
        console.log('해시태그 검색 배열', search_hashtag_Data);
        let url = "https://www.jerneithe.site/board/search?categories="
        if(search_category_Data.length != 0) {
            for(let i=0 ; i<search_category_Data.length ; i++) {
                url += search_category_Data[i];
            }
        }
        if(search_hashtag_Data.length != 0) {
            url += '&hashtags='
            for(let i=0 ; i<search_hashtag_Data.length ; i++) {
                url += search_hashtag_Data[i];
            }
        }

        const req = await axios({
            method: 'GET',
            url : url,
        });

        //req 데이터 형식 확인 후 setFeedd로 데이터 넣기

        // console.log(req.data);
        setFeedd(req.data);
    }


    return(<>
        <div className="search_dj">
            <div className="search_contain_dj">
                <input 
                    id="search_input_dj" 
                    type="text" 
                    placeholder="#해시태그를 입력하세요. #이 없다면 검색이 안돼요ㅠ"
                    value={hash_value}
                    onChange={handleInputChange}
                ></input>
                <button id="search_btn_dj" onClick={search_final}>
                    <Image
                        src="/images/search.svg"
                        alt="search"
                        className="search_img_dj"
                        width={15}
                        height={8}
                        priority
                    />
                </button>
            </div>
            <button id="cancle_btn_dj">취소</button>
        </div>
    </>)
}