import { atom } from "recoil"

interface IMAGE{
    boardId: number;
    imageId: number;
    image_url: string;
}

interface FEEDATA {
    boardId : number;
    images : IMAGE;
    likeCount : number;
    nickName : string;
    temperature : number;
    weather : string;
}

export const FeedContent = atom<FEEDATA[]>({
    key:'contents_key_dj',//전역적으로 유일한 값
    default:[]
});