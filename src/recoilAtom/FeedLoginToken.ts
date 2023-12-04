import { atom } from "recoil"


export const FeedLoginToken = atom<string | undefined>({
    key:'Feed_login_token_key',//전역적으로 유일한 값
    default:""
});