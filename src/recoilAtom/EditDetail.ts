import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/app/detail/edit/page";
import { atom } from "recoil";

export const editBoardIdState = atom({
  key: "editBoardIdState",
  default: loadFromLocalStorage("editBoardId", ""),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveToLocalStorage("editBoardId", newValue);
      });
    },
  ],
});
