"use client";

import FeedSearch from "@/component/FeedSearch";
import WeatherBar from "@/component/WeatherBar";
import FeedCategory from "@/component/FeedCategory";
import FeedContenets from "@/component/FeedContents";
import Menubar from "@/component/MenuBar";
import "../../style/feed.scss";

export default function Feed() {
  return (
    <>
      {/* <RecoilRoot> */}
      <div className="container_dj">
        <br />
        <FeedSearch />
        <hr />
        <WeatherBar />
        <FeedCategory />
        <FeedContenets />
        <Menubar />
      </div>
      {/* </RecoilRoot> */}
    </>
  );
}
