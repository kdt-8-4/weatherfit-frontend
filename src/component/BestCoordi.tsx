import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { WeatherState } from "@/recoilAtom/WeatherState";
import "@/style/best_main.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Board {
  id: number;
  imageUrl: string;
  likeCount: number;
}

export default function BestCoordi() {
  const [boards, setBoards] = useState<Board[]>([]);
  const weather = useRecoilValue(WeatherState);
  const router = useRouter();

  const sendDetail = async (board_id: number) => {
    console.log("게시글 아이디", board_id);
    localStorage.setItem("getBoardId_local", JSON.stringify(board_id));
    router.push("/detail");
  };

  //현재 최저, 최고온도에 따른 좋아요가 가장 많은 게시물 5개 가져오기
  useEffect(() => {
    async function getTop5() {
      try {
        const response = await axios({
          method: "GET",
          url: `https://www.jerneithe.site/board/tops?temp_min=${weather.min}&temp_max=${weather.max}`,
        });

        setBoards(response.data.result);
        console.log("top5", boards);
      } catch (err) {
        console.error(err);
      }
    }

    getTop5();
  }, []);

  return (
    <div>
      <h2>
        오늘 날씨, <span className="highlight">좋아요가 가장 많은</span> 코디는?
      </h2>
      <div className="boardTop5">
        {boards.map((board, index) => (
          <Link
            href={"/detail"}
            key={index}
            onClick={() => sendDetail(board.id)}>
            {/* <img src={board.imageUrl} alt={`Board ${board.id}`} /> */}
            <Image
              src={board.imageUrl}
              alt={`Board ${board.id}`}
              width={30}
              height={40}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
