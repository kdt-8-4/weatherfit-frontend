import { atom } from "recoil";

interface IMAGE {
  boardId: number;
  imageId: number;
  imageUrl: string;
}

interface LIKE {
  likeId : number;
  nickName: string;
}

interface FEEDATA {
  boardId: number;
  images: IMAGE;
  createDate?: string;
  likeCount: number;
  likelist: LIKE[];
  nickName: string;
  temperature: number;
  weather: string;
  weatherIcon?: string;
}

export const FeedContent = atom<FEEDATA[]>({
  key: "contents_key_dj", //전역적으로 유일한 값
  default: [],
});
