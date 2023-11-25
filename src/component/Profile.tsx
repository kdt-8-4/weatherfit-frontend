"use client";
import Image from "next/image";

export default function Profile(): JSX.Element {
  return (
    <div className="profile w-full h-20 flex items-center p-3">
      <div className="img relative rounded-full overflow-hidden w-12 h-12 md:w-18 md:h-18 lg:w-18 lg:h-18">
        <Image
          src="/images/profile.jpeg"
          alt="profile_img"
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
      <div className="text flex flex-col ml-2">
        <span>홍길동</span>
        <span>-5 ℃</span>
      </div>
    </div>
  );
}
