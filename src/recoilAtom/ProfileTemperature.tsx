import { atom } from "recoil";

export const ProfileTemperature = atom<string>({
  key: "tem_key_profile", //전역적으로 유일한 값
  default: "",
});
