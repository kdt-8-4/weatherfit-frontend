import { useEffect, useState } from "react";
import "../style/feedCategory.scss";
import FeedcateDetail from "./FeedCateDetail";
import FeedTemControl from "./FeedTemControl";
import { BloomFilter } from "next/dist/shared/lib/bloom-filter";

interface TabMenu {
    id: number;
    title?: string;
    val: string;
  }

export default function FeedCategory(){

    //useState
    const [usetab, setTab] = useState<TabMenu[]>([
        {
            id: 1,
            title : "상의",
            val : "top"
        },
        {
            id: 2,
            title : "아우터",
            val : "outer"
        },
        {
            id: 3,
            title : "하의",
            val : "pants"
        },
        {
            id: 4,
            title : "신발",
            val : "shoes"
        },
        {
            id: 5,
            title : "가방",
            val : "back"
        },
        {
            id: 6,
            title : "모자",
            val : "hat"
        }
    ]);

    const [tab_control, setControl] = useState<boolean>(false);
    const [send_val, setVal] = useState<string>();

    const [temtab_control, setTemtab] = useState<boolean>(false);

    //useEffect
    // useEffect(()=>{
    //     console.log("탭 메뉴",usetab);
    // },[]);


    //js

    const tab_title = (title?:string) => {
        if(tab_control == false) {
            setControl(true);
            setVal(title);
        } else {
            setControl(false);
        }
    }

    // console.log(tab_control);

    const tem_btn = () => {
        if(tab_control == false) {
            setTemtab(true);
        } else {
            setTemtab(false);
        }
    }

    
    return(<>
        <div id="category_dj_box">
            <ul id="category_dj">
                {
                    usetab.map((val) => {
                        return<li key={val.id} className="tab_menu_dj" onClick={() => tab_title(val.val)}> | {val.title} |</li>
                    })
                }
            </ul>
            <button onClick={tem_btn}>온도 조절</button>
        </div>
        {tab_control && <FeedcateDetail categorytitle = {send_val} tab_control = {tab_control} setControl = {setControl}/>}
        {temtab_control && <FeedTemControl  setTemtab = {setTemtab}/>}       
    </>)
}