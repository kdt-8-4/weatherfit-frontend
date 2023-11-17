import { Link } from "@mui/icons-material";
import "../../style/login.scss";
import CloseIcon from "@mui/icons-material/Close";
import Menubar from "../../component/MenuBar";

export default function Login() {
  return (
    <>
      <CloseIcon />
      <hr className="layout_hr" />
      <br />
      <div className="login_logobox">
        기온별 옷차림은,
        <p>옷 늘 날 씨</p>
      </div>
      <br />
      <br />
      <form className="login_form">
        <input type="text" className="login_id" placeholder="아이디" />
        <br />
        <input type="password" className="login_pw" placeholder="비밀번호" />
        <br />
        <br />
        <button type="button">로 그 인</button>
      </form>
      <br />
      <div className="login_linkbox">
        <a className="link_pw">비밀번호 찾기</a> |
        <a className="link_signup">회원가입</a>
      </div>
      <br />
      <br />
      <br />
      <div className="login_easy">
        <hr /> 간편 로그인 <hr />
      </div>
      <Menubar />
    </>
  );
}
