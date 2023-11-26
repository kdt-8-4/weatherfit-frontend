"use client";
import Image from "next/image";

export default function ImageDetail(): JSX.Element {
  return (
    <div className="uploadedImg w-full h-100">
      <div className="relative overflow-hidden w-95 h-100 md:w-18 md:h-18 lg:w-18 lg:h-18">
        <Image
          src="/images/test2.jpeg"
          alt="uploaded image"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
