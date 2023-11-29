import { atom } from "recoil"

export const TemMinControl = atom<string>({
    key:'tem_min_key',//전역적으로 유일한 값
    default: ""
});