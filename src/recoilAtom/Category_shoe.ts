import { atom } from "recoil"


export const FeedShoe = atom<string[]>({
    key:'shoes_key',//전역적으로 유일한 값
    default:[]
});