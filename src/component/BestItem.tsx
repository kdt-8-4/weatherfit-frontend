import axios from "axios";
import { useEffect, useState } from "react";
import "@/style/best_main.scss";
import { useRecoilValue } from "recoil";
import { WeatherState } from "@/recoilAtom/WeatherState";

interface Category {
  _id: string;
  count: number;
}

export default function BestItem() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const weather = useRecoilValue(WeatherState);

  // 현재 최저, 최고온도에 따른 가장 많이쓰인 카테고리 탑5
  useEffect(() => {
    async function getTop5() {
      try {
        const response = await axios({
          method: "GET",
          url: `https://www.jerneithe.site/category/tops?temp_min=${weather.min}&temp_max=${weather.max}`,
        });

        setCategories(response.data.result);
        setIsLoading(false); // 로딩 완료 후 상태 업데이트
        console.log("카테고리 top5", response.data.result);
      } catch (err) {
        console.error(err);
      }
    }

    getTop5();
  }, [weather.max, weather.min]);

  return (
    <div className="categoryTop5-container">
      <h2>
        오늘 날씨, <span className="highlight">손이 많이 간</span> 아이템은?
      </h2>
      {isLoading ? ( // 로딩 중인 경우
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : categories.length > 0 ? ( // categories 배열의 길이가 0보다 큰 경우
        <div className="categoryTop5">
          {categories.map((category, index) => (
            <button className="category_btn" key={index}>
              {category._id}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>카테고리가 아직 없어요..🥲</div>
      )}
    </div>
  );
}
