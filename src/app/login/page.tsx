"use client";
import "../../style/login.scss";
import CloseIcon from "@mui/icons-material/Close";
import Menubar from "../../component/MenuBar";
import { RecoilRoot } from "recoil";
import LoginForm from "@/component/LoginForm";

export default function Login() {
  return (
    // <RecoilRoot>
      <div className="container">
        <CloseIcon />
        <hr className="layout_hr" />
        <br />
        <LoginForm />
        <br />
        <Menubar />
      </div>
    // </RecoilRoot>
  );
}
