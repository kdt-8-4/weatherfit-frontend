import { useRouter } from "next/navigation";
import "../style/menubar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";

export default function Menubar() {
  // const router = useRouter(); // useRouter 훅을 사용하여 router 객체 가져오기
  // const goto_home = () => {
  //   router.push("/"); // '/'로 페이지 이동
  // };
  // const goto_feed = () => {
  //   router.push("/feed"); // '/feed'로 페이지 이동
  // };
  // const goto_upload = () => {
  //   router.push("/upload"); // '/upload'로 페이지 이동
  // };
  // const goto_myPage = () => {
  //   router.push("/mypage"); // '/mypage'로 페이지 이동
  // };

  return (
    <div className="menubar">
      <Link href="/" className="menu_box">
        <HomeOutlinedIcon className="menu_icon" />
        <span>홈</span>
      </Link>
      <Link href="/feed" className="menu_box">
        <CheckroomOutlinedIcon className="menu_icon" />
        <span>구경</span>
      </Link>
      <Link href="/upload" className="menu_box">
        <AddBoxOutlinedIcon className="menu_icon" />
        <span>업로드</span>
      </Link>
      <Link href="mypage" className="menu_box">
        <PersonOutlineOutlinedIcon className="menu_icon" />
        <span>마이페이지</span>
      </Link>
    </div>
  );
}
