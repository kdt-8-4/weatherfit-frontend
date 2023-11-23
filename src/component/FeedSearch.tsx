import Image from "next/image";
import "../style/feedSearch.scss";

import { FeedSearchData } from "@/recoilAtom/FseahData";
import { useRecoilState } from "recoil";
import { useState } from "react";

export default function FeedSearch(){

    const [catesearch, setCateSearch] = useRecoilState(FeedSearchData);
    console.log("검색할 카테고리 데이터", catesearch);

    const [hash_value, setHval] = useState<string>("");

    //검색 아이콘 누르면 선택한 카테고리 데이터가 있는 아톰에서 배열들을 가져오고
    //해시태그에 있는 스트링을 # 기준으로 나누어 배열에 넣은 뒤에
    //모두 합쳐서 백엔드로 보내면 됨
    const search_final = () => {
        
    }


    return(<>
        <div className="search_dj">
            <div className="search_contain_dj">
                <input id="search_input_dj" type="text" placeholder="#해시태그를 입력하세요."></input>
                <button id="search_btn_dj" onChange={() => search_final()}>
                    <Image
                        src="/search.svg"
                        alt="search"
                        className="search_img_dj"
                        width={12}
                        height={8}
                        priority
                    />
                </button>
            </div>
            <button id="cancle_btn_dj">취소</button>
        </div>
    </>)
}