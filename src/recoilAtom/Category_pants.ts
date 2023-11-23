import { atom } from "recoil"


export const FeedPants = atom<string[]>({
    key:'pants_key',//전역적으로 유일한 값
    default:[]
});