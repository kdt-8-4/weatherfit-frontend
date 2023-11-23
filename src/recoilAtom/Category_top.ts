import { atom } from "recoil"


export const FeedTop = atom<string[]>({
    key:'top_key',//전역적으로 유일한 값
    default:[]
});