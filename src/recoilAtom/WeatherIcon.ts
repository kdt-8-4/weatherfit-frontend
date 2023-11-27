import { atom } from "recoil"


export const WeatherIcons = atom<string>({
    key:'weather_icon_key',//전역적으로 유일한 값
    default:""
});