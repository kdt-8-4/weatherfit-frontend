import { atom } from "recoil"


export const FeedHat = atom<string[]>({
    key:'hat_key',//전역적으로 유일한 값
    default:[]
});