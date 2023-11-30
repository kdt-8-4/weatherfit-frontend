import axios from "axios";
import { useState, useEffect } from "react";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import GridOnTwoToneIcon from "@mui/icons-material/GridOnTwoTone";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikePost from "./LikePost";
import MyPost from "./MyPost";
import { useRecoilState } from "recoil";
import { FeedContent } from "@/recoilAtom/FeedContents";

interface IMAGE {
  boardId: number;
  imageId: number;
  image_url: string;
}

interface FEEDATA {
  boardId: number;
  images: IMAGE;
  likeCount: number;
  nickName: string;
  temperature: number;
  weather: string;
}

interface TabbarProps {
  myPostData: FEEDATA[];
}

export default function TabBar(props: TabbarProps) {
  const { myPostData } = props;
  const [grid, setGrid] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);

  const handleGridClick = () => {
    if (!liked && grid) {
      setGrid(grid);
    } else {
      setGrid(true);
      setLiked(false);
    }
  };

  const handleLikeClick = () => {
    if (!grid && liked) {
      setLiked(liked);
    } else {
      setLiked(true);
      setGrid(false);
    }
  };

  return (
    <>
      <div className="tab_bar">
        {grid ? (
          <GridOnTwoToneIcon
            className="icon click_icon"
            onClick={handleGridClick}
          />
        ) : (
          <GridOnOutlinedIcon className="icon" onClick={handleGridClick} />
        )}

        {liked ? (
          <FavoriteIcon className="icon click_icon" onClick={handleLikeClick} />
        ) : (
          <FavoriteBorderOutlinedIcon
            className="icon"
            onClick={handleLikeClick}
          />
        )}
      </div>
      {/* post 부분 */}
      {grid ? <MyPost myPostData={myPostData} /> : null}
      {liked ? <LikePost /> : null}
    </>
  );
}
