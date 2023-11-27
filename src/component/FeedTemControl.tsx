
import { useRecoilState } from "recoil";
import InputBar from "./InputBar";

import { TemMaxControl } from "@/recoilAtom/TemMax";
import { TemMinControl } from "@/recoilAtom/TemMin";
import { TemNowControl } from "@/recoilAtom/TemNow";

import "../style/temControl.scss"
import { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction } from "react";

interface PROPS{
    setTemtab:Dispatch<SetStateAction<boolean>>;
}

export default function FeedTemControl({ setTemtab }: PROPS){

    const [usetemp, setTemp] = useRecoilState(TemNowControl);
    const [max, setMax] = useRecoilState(TemMaxControl);
    const [min, setMin] = useRecoilState(TemMinControl);

    const max_input :ChangeEventHandler<HTMLInputElement> = (val) => {
        console.log("지정한 최고온도", val.target.value);
        setMax(val.target.value);
    } 

    const min_input :ChangeEventHandler<HTMLInputElement> = (val) => {
        console.log("지정한 최저온도", val.target.value);
        setMin(val.target.value);
    } 

    const temcon_com = () => {
        setTemtab(false);
    }

    return(<>
        <div className="tem_cont_box">
            <div id="max_cont">
                <span>최고온도 설정 : </span>
                <input id="max_input" onChange={max_input} value={max} placeholder="최고온도를 설정하세요."></input>
            </div>
            <div id="min_cont">
            <span>최저온도 설정 : </span>
                <input id="min_input" onChange={min_input} value={min} placeholder="최저온도를 설정하세요."></input>
            </div>
            <button onClick={temcon_com}>완료</button>
        </div>
    </>)
}