import { atom } from "recoil"


export const FeedBack = atom<string[]>({
    key:'back_key',//전역적으로 유일한 값
    default:[]
});