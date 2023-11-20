"use client";
import Menubar from "@/component/MenuBar";
import WeatherBar from "@/component/WeatherBar";
import CloseIcon from "@mui/icons-material/Close";
import "../../style/upload.scss";

export default function Upload(): JSX.Element {
  return (
    <div className="container">
      <header>
        <div className="top">
          <CloseIcon id="x" />
          <h3>등록하기</h3>
          <span>완료</span>
        </div>
        <WeatherBar />
      </header>
      <section className="main"></section>

      <footer>
        <Menubar />
      </footer>
    </div>
  );
}
