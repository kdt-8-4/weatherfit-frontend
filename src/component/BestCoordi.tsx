import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { WeatherState } from "@/recoilAtom/WeatherState";
import "@/style/best_main.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === boards.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? boards.length - 1 : prevIndex - 1,
    );
  };

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
          // url: `https://www.jerneithe.site/board/tops?temp_min=${weather.min}&temp_max=${weather.max}`,
          url: `https://www.jerneithe.site/board/tops?temp_min=0&temp_max=10`,
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
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {boards.map((board, index) => (
            <div key={index} className="carousel-slide">
              <div className="image-wrapper">
                <Image
                  className="carousel_img"
                  src={board.images.imageUrl}
                  alt={`Board ${board.boardId}`}
                  layout="fill"
                  onClick={() => sendDetail(board.boardId)}
                />
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-prev" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className="carousel-next" onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
