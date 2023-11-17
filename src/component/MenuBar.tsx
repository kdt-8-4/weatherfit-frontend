import "../style/menubar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function Menubar() {
  return (
    <>
      <footer>
        <div className="menu_box">
          <HomeOutlinedIcon className="menu_icon" />
          <span>홈</span>
        </div>
        <div className="menu_box">
          <CheckroomOutlinedIcon className="menu_icon" />
          <span>구경</span>
        </div>
        <div className="menu_box">
          <AddBoxOutlinedIcon className="menu_icon" />
          <span>업로드</span>
        </div>
        <div className="menu_box">
          <PersonOutlineOutlinedIcon className="menu_icon" />
          <span>마이페이지</span>
        </div>
      </footer>
    </>
  );
}
