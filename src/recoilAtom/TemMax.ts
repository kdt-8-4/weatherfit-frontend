import { atom } from "recoil"

export const TemMaxControl = atom<string>({
    key:'tem_max_key',//전역적으로 유일한 값
    default:""
});