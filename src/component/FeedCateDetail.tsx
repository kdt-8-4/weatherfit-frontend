import { useRecoilState, useRecoilValue } from "recoil";
import { Dispatch, SetStateAction, useState } from "react";

import { FeedAtom } from "@/recoilAtom/FeedAtom";

import { FeedSearchdata } from "@/recoilAtom/FseahData";

import { FeedTop } from "@/recoilAtom/Category_top";
import { FeedOuter } from "@/recoilAtom/Category_out";
import { FeedPants } from "@/recoilAtom/Category_pants";
import { FeedShoe } from "@/recoilAtom/Category_shoe";
import { FeedBack } from "@/recoilAtom/Category_back";
import { FeedHat } from "@/recoilAtom/Category_hat";

interface PROPS {
    categorytitle: string | undefined;
    setControl: Dispatch<SetStateAction<boolean>>;
    tab_control: boolean;
}

interface DATA {
    id: number;
    Ctitle: string;
    arr: string[]; 
}

interface SEARCH{
    categoryT:string;
    serch_data:string[];
}

export default function FeedcateDetail( { categorytitle, setControl } : PROPS) {
    
    //▷ 리코일
    // 만약 Value나 Set만 사용할 경우 
    // value >> const state = useRecoilValue(`값`);
    // set >> const setState = useSetRecoilState(`값`);
    // seState에서 이전 값을 사용하던 방식 사용 가능 setState((prev)=>[...prev, data]);
    const category_data = useRecoilValue(FeedAtom);

    const [search, setSearch] = useRecoilState<SEARCH[]>(FeedSearchdata);

    const [top_data, setTop] = useRecoilState<string[]>(FeedTop);
    const [outer_data, setOuter] = useRecoilState<string[]>(FeedOuter);
    const [pants_data, setPants] = useRecoilState<string[]>(FeedPants);
    const [shoes_data, setShoe] = useRecoilState<string[]>(FeedShoe);
    const [back_data, setBack] = useRecoilState<string[]>(FeedBack);
    const [hat_data, setHAt] = useRecoilState<string[]>(FeedHat);
    //아톰에서 미리 형식을 지정해주지 않으면 never로 떠서 값을 못넣는다.



    //▷ useState
    const [delData, setDel] = useState<string[]>([]);
    let chooseCa:string[] = [];

    //▷ 데이터 확인하기
    console.log(category_data);
    // console.log(Object.keys(category_data));//키만 가지고 오기
    console.log(categorytitle);

    if(categorytitle == "top") {
        chooseCa = [...top_data];
    } else if(categorytitle == "outer"){
        chooseCa = [...outer_data];
    } else if(categorytitle == "pants"){
        chooseCa = [...pants_data];
    } else if(categorytitle == "shoes"){
        chooseCa = [...shoes_data];
    } else if(categorytitle == "back"){
        chooseCa = [...back_data];
    } else if(categorytitle == "hat"){
        chooseCa = [...hat_data];
    }


    //▷ 가져온 Value 값을 Ctitle로 가진 배열 가지고오기
    const caArr:DATA | undefined  = category_data.find(arr => arr.Ctitle == categorytitle);
    const view_arr:string[] | undefined = caArr?.arr; 
    console.log(view_arr);

    //▷ 이벤트 리스너
    
    //선택한 카테고리 useRecoilState 배열에 넣기 
    const cate_btn = ( btnval: string ) => {
        console.log(btnval);
        console.log("현재 카테고리", categorytitle)

        //btnval값이 배열에 존재하지 않을때만 push
        if(categorytitle == "top") {
            if (!top_data.includes(btnval)) {
                setTop([...top_data, btnval]);
            }
        } else if(categorytitle == "outer"){
            if (!outer_data.includes(btnval)) {
                setOuter([...outer_data, btnval]);
            }
        } else if(categorytitle == "pants"){
            if (!pants_data.includes(btnval)) {
                setPants([...pants_data, btnval]);
            }
        } else if(categorytitle == "shoes"){
            if (!shoes_data.includes(btnval)) {
                setShoe([...shoes_data, btnval]);
            }
        } else if(categorytitle == "back"){
            if (!back_data.includes(btnval)) {
                setBack([...back_data, btnval]);
            }
        } else if(categorytitle == "hat"){
            if (!hat_data.includes(btnval)) {
                setHAt([...hat_data, btnval]);
            }
        }

        // if (!chooseCa.includes(btnval)) {
        //     setChoose([...chooseCa, btnval]);
        // }
        // console.log(chooseCa);
        
    }

    // 선택한 카테고리 선택 취소 
    const del_choose = (delval:string) => {
        if(categorytitle == "top") {
            setTop((prevArray) => prevArray.filter((item) => item !== delval));
            //선택한 카테고리를 제외했을때 제외한 데이터를 배열에 넣어서 검색 아톰에서 삭제하기위한 delDat 배열
            setDel((prev) => [...new Set([...prev, delval])]);
        } else if(categorytitle == "outer"){
            setOuter((prevArray) => prevArray.filter((item) => item !== delval));
            setDel((prev) => [...new Set([...prev, delval])]);
        } else if(categorytitle == "pants"){
            setPants((prevArray) => prevArray.filter((item) => item !== delval));
            setDel((prev) => [...new Set([...prev, delval])]);
        } else if(categorytitle == "shoes"){
            setShoe((prevArray) => prevArray.filter((item) => item !== delval));
            setDel((prev) => [...new Set([...prev, delval])]);
        } else if(categorytitle == "back"){
            setBack((prevArray) => prevArray.filter((item) => item !== delval));
            setDel((prev) => [...new Set([...prev, delval])]);
        } else if(categorytitle == "hat"){
            setHAt((prevArray) => prevArray.filter((item) => item !== delval));
            setDel((prev) => [...new Set([...prev, delval])]);
        }
        // setChoose((prevArray) => prevArray.filter((item) => item !== delval));
    }

    //카테고리 선택완료시 Atom으로 데이터 전송
    const startSearch = () => {
        // setSearch((prev) => [...new Set([...prev, ...chooseCa])]);

        //카테고리에 맞는 검색 배열에 검색 데이터 넣기 
        //중복을 제어하기 위해 Set 사용
        setSearch((prevSearch) =>
        
        //중복된 값이 없도록 추가하는 방법
        prevSearch.map((item) =>
            item.categoryT === categorytitle
            ? { ...item, serch_data: Array.from(new Set([...item.serch_data, ...chooseCa])) }
            : item
        ));

        setControl(false);

        //특정 배열과 아톰이 가지고 있는 모든 배열을 비교하고, 
        //동일한 값을 가진 경우 해당 값을 삭제하는 코드
        setSearch((prevSearch) =>
        prevSearch.map((item) => ({
          ...item,
          serch_data: item.serch_data.filter((data) => !delData.includes(data)),
        }))
      );

      //근데 이렇게 삭제할때마다 삭제 데이터 배열(delData)의 값들이 사라짐
      //원하는 방식이기는 하나 이유를 모르겠음...


    }

    console.log("검색 데이터 배열",search);
    console.log("삭제할 카테고리", delData);


    return(<>
        <div id="tab_detail" style={{"display":"flex"}}>
            <div>{/* 카테고리 목록 */}
                {view_arr && view_arr.map((myarr, index)=>{
                        return(<>
                            <button key={index} className="cate_btn_dj" onClick={()=>cate_btn(myarr)}>{myarr}</button>
                            <br />
                        </>)
                    }
                )}
            </div>
            <div id="choose">
                {/* 
                --선택한 카테고리 띄워주기--
                기억해야하는것
                - 앞에 chooseCa && 없이 그냥 쓴다면 chooseCa 배열에 값이 
                존재하지 않을때에 대해 오류가 뜨기 때문에 앞에 단축평가로
                오류 예방  
                */}
                {chooseCa && chooseCa.map((myarr, index)=>{
                    return(<>
                        <div style={{"display":"flex"}}>
                            <p key={index} className="chooseCa">{myarr} </p>
                            <button onClick={() => del_choose(myarr)}> x</button> 
                        </div>
                    </>)
                })}
                <button onClick={startSearch}>완료</button>
            </div>
        </div>
    </>)
}