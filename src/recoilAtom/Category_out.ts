import { atom } from "recoil"


export const FeedOuter = atom<string[]>({
    key:'outer_key',//전역적으로 유일한 값
    default:[]
});