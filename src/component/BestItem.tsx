import axios from "axios";
import { useEffect, useState } from "react";
import "@/style/bestItem.scss";
import { useRecoilValue } from "recoil";
import { WeatherState } from "@/recoilAtom/WeatherState";

interface Category {
  _id: string;
  count: number;
}

export default function BestItem() {
  const [categories, setCategories] = useState<Category[]>([]);
  const weather = useRecoilValue(WeatherState);

  //현재 최저, 최고온도에 따른 가장 많이쓰인 카테고리 탑5
  useEffect(() => {
    async function getTop5() {
      try {
        const response = await axios({
          method: "GET",
          url: `https://www.jerneithe.site/category/tops?temp_min=${weather.min}&temp_max=${weather.max}`,
        });

        setCategories(response.data.result);
        console.log("top5", categories);
      } catch (err) {
        console.error(err);
      }
    }

    getTop5();
  }, []);

  return (
    <div>
      <h2>
        오늘 날씨, <span className="highlight">손이 많이 간</span> 아이템은?
      </h2>
      <div className="categoryTop5">
        {categories.map((category, index) => (
          <button className="category_btn" key={index}>
            {category._id}
          </button>
        ))}
      </div>
    </div>
  );
}
