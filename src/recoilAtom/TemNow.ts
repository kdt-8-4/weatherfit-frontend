import { atom } from "recoil"

export const TemNowControl = atom<string>({
    key:'tem_now_key',//전역적으로 유일한 값
    default:""
});