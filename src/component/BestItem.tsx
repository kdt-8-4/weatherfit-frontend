import axios from "axios";
import { useEffect, useState } from "react";
import "@/style/bestItem.scss";

interface Category {
  _id: string;
  count: number;
}

export default function BestItem() {
  const [categories, setCategories] = useState<Category[]>([]);
  //현재 최저, 최고온도에 따른 가장 많이쓰인 카테고리 탑5
  useEffect(() => {
    async function getTop5() {
      try {
        const response = await axios({
          method: "GET",
          url: "https://www.jerneithe.site/category/tops?temp_min=0&temp_max=30",
        });

        setCategories(response.data.result);
        console.log(response.data.result);
      } catch (err) {
        console.error(err);
      }
    }

    getTop5();
  }, []);

  return (
    <div className="categoryTop5">
      {categories.map((category, index) => (
        <button className="category_btn" key={index}>
          {category._id}
        </button>
      ))}
    </div>
  );
}
