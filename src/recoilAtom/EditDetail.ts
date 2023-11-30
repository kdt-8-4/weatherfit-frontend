import { atom, useRecoilState } from "recoil";

// 상태 정의
export const editBoardIdState = atom({
  key: "editBoardId", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
