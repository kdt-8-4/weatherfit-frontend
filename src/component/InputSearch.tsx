import Image from "next/image";
import "../style/inputSearch.scss";

export default function InputSearch() {
  return (
    <div className="container">
      <div id="search">
        <input type="text" placeholder="검색어를 입력하세요" />
        {/* 버튼 ui -> = 취소랑 같은 기능 */}
        <Image
          src="/search.svg"
          alt="search"
          className="search"
          width={100}
          height={24}
          priority
        />
        <button id="btn_cancel">취소</button>
      </div>
    </div>
  );
}
