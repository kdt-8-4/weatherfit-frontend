"use client";
import Menubar from "@/component/MenuBar";
import WeatherBar from "@/component/WeatherBar";
import CloseIcon from "@mui/icons-material/Close";
import "../../style/upload.scss";
import ImageUpload from "@/component/ImageUpload";
import TextArea from "@/component/TextArea";

export default function Upload(): JSX.Element {
  const handleImagesSelected = (files: FileList | null) => {
    if (files) {
      // 여기서 파일 처리 또는 필요한 작업 수행
      console.log("Selected files:", files);
    }
  };
  return (
    <div className="container">
      <header>
        <div className="top">
          <CloseIcon id="x" />
          <h2>등록하기</h2>
          <button type="button" id="btn_complete">
            완료
          </button>
        </div>
        <hr />
        <WeatherBar />
        <hr />
      </header>
      <section className="main">
        <h2>오늘 날씨의 옷차림을 올려주세요!</h2>
        <div className="content">
          <ImageUpload onImagesSelected={handleImagesSelected} />
          <hr />
          <TextArea
            content=""
            placeholder="코디에 같이 올리고 싶은 #해시태그를 작성해주세요"
          />
        </div>
        <div className="category"></div>
      </section>

      <footer>
        <Menubar />
      </footer>
    </div>
  );
}
