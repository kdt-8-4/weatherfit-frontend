import { atom } from "recoil";

export const Login_token = atom<string>({
  key: "login_token_key", //전역적으로 유일한 값
  default: "",
});
