import { saveToLocalStorage, loadFromLocalStorage } from "@/component/storage";
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
