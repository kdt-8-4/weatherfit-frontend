"use client";
import { Link } from "@mui/icons-material";
import "../../style/login.scss";
import CloseIcon from "@mui/icons-material/Close";
import Menubar from "../../component/MenuBar";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RecoilRoot } from "recoil";
import LoginForm from "@/component/LoginForm";

export default function Login() {
  return (
    <RecoilRoot>
      <div className="container">
        <CloseIcon />
        <hr className="layout_hr" />
        <br />
        <LoginForm />
        <Menubar />
      </div>
    </RecoilRoot>
  );
}
