import { useRecoilState, useRecoilValue } from "recoil";
import { FeedContent } from "@/recoilAtom/FeedContents";
import { FeedFullcontents } from "@/recoilAtom/FeedFulldata";
import { useEffect, useState } from "react";
import "@/style/FeedSort.scss";

export default function FeedSort(){
    
    const [feedata, setFeedd] = useRecoilState(FeedContent);
    const fullfeeddata = useRecoilValue(FeedFullcontents);
    // console.log("정렬 컴포넌트로 넘어간 피드 데이터", feedata);
    const [sortType, setSortType] = useState<string>('');

    const allcontents = () => {
        setFeedd(fullfeeddata);
    }

    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortType(event.target.value);
    }

    const sortByLikes = () => {
        const sorted = [...feedata].sort((a, b) => b.likeCount - a.likeCount);
        setFeedd(sorted);
    };

    const sortByNewest = () => {
        const sorted = [...feedata].sort((a, b) => b.boardId - a.boardId);
        setFeedd(sorted);
    };

    const sortByOldest = () => {
        const sorted = [...feedata].sort((a, b) => a.boardId - b.boardId);
        setFeedd(sorted);
    };

    useEffect(() => {
        if (sortType === '좋아요순') {
            sortByLikes();
        } else if (sortType === '최신순') {
            sortByNewest();
        } else if (sortType === '오래된순') {
            sortByOldest();
        }
    }, [sortType]);

    return(
    <>
    <div className="sort_box">
        <div>
            <button id="allview_btn" onClick={allcontents}>전체 보기</button>
            <select id="sortSelect_bar" onChange={handleSort}>
                <option>최신순</option>
                <option>좋아요순</option>
                <option>오래된순</option>
            </select>
        </div>
    </div>
    </>
    )
}
