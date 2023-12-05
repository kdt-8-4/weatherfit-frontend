// recoilAtom.js
import { atom } from "recoil";

export const WeatherState = atom({
  key: "weatherState",
  default: { weat: null, max: null, min: null, usetemp: null },
});
