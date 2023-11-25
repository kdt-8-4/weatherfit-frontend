"use client";

import WeatherBar from "@/component/WeatherBar";
import Image from "next/image";

export default function Detail(): JSX.Element {
  return (
    <div className="container">
      <div className="w-full h-12 flex items-center ">
        <Image src="/images/back.svg" width={15} height={15} alt="back" />
      </div>
      <hr className="w-full h-px" />
      <WeatherBar />
      <hr className="w-full h-px" />
    </div>
  );
}
