import { atom } from "recoil"


export const FeedDecodeNickname = atom<string | undefined>({
    key:'decode_nickname_key',//전역적으로 유일한 값
    default:""
});