import { useState } from "react";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import GridOnTwoToneIcon from "@mui/icons-material/GridOnTwoTone";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikePost from "./LikePost";
import MyPost from "./MyPost";

export default function TabBar() {
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
      {grid ? <MyPost /> : null}
      {liked ? <LikePost /> : null}
    </>
  );
}
