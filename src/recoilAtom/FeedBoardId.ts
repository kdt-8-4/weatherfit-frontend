import { atom } from "recoil";

export const FeedBoardId = atom<number>({
  key: "feed_boardId_key", //전역적으로 유일한 값
  default: 0,
});
