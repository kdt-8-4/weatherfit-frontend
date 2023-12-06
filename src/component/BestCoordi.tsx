import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { WeatherState } from "@/recoilAtom/WeatherState";
import "@/style/best_main.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Board {
  boardId: number;
  images: {
    imageId: number;
    boardId: number;
    imageUrl: string;
  };
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

        setBoards(response.data.content);
        console.log("게시물 top5", response.data.content);
      } catch (err) {
        console.error(err);
      }
    }

    getTop5();
  }, [weather.max, weather.min]);

  return (
    <div className="boardTop5-container">
      <h2>
        오늘 날씨, <span className="highlight">좋아요가 가장 많은</span> 코디는?
      </h2>
      <div className="boardTop5">
        {boards.map((board, index) => (
          <div
            key={index}
            onClick={() => sendDetail(board.boardId)}
            style={{ cursor: "pointer", width: "100%", height: "100%" }}>
            <div
              className="image-wrapper"
              style={{
                position: "relative",
                paddingBottom: "100%",
                width: "100%",
                height: "100%",
              }}>
              <Image
                src={board.images.imageUrl}
                alt={`Board ${board.boardId}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
