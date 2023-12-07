import axios from "axios";
import { useEffect, useState } from "react";
import "@/style/best_main.scss";
import { useRecoilValue } from "recoil";
import { WeatherState } from "@/recoilAtom/WeatherState";
import { Category } from "@mui/icons-material";
import { categories } from "./category";

interface Category {
  _id: string;
  count: number;
}

export default function BestItem({ categories }: { categories: Category[] }) {
  return (
    <div className="categoryTop5-container">
      <h2>
        오늘 날씨, <span className="highlight">손이 많이 간</span> 아이템은?
      </h2>
      {categories.length > 0 ? ( // categories 배열의 길이가 0보다 큰 경우
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
