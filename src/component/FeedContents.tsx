import axios from "axios";
import { useEffect } from "react";


export default function FeedContenets(){
    // useEffect(()=>{
    //     const feeddata = async() => {
    //         const req = axios({
    //             method: "GET",
    //             url: "https://www.jerneithe.site/comment/comments?boardId=1",
    //         });

    //         console.log("받아온 피드 데이터", req);
    //     }
    //     feeddata();
    // }, []);

    const btn = () => {
        
            const req = axios({
                method: "GET",
                url: "https://www.jerneithe.site/comment/comments?boardId=1",
            });

            console.log("받아온 피드 데이터", req);

            console.log(req);


    }

    return(<>
        <button onClick={btn}>버튼</button>
    </>)
}