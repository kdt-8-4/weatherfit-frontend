import axios from "axios";
import { useEffect } from "react";


export default function FeedContenets(){
    useEffect(()=>{
        const feeddata = async() => {
            const req = axios({
                method: "GET",
                url: "https://www.jerneithe.site/comment/comments?boardId=1",
            });

            console.log("받아온 피드 데이터", req);
        }
        feeddata();
    }, []);

    return(<>
        
    </>)
}