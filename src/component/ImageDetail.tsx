"use client";
import Image from "next/image";

interface ImageDetailProps {
  images: string[];
}

export default function ImageDetail({ images }: ImageDetailProps): JSX.Element {
  return (
    <div className="uploadedImg w-full h-100">
      <div className="relative overflow-hidden w-95 h-100 md:w-18 md:h-18 lg:w-18 lg:h-18">
        {images &&
          images.length > 0 &&
          images.map((image, index) => (
            <Image
              key={index}
              src={image[2]}
              alt={`Image ${index}`}
              width={100}
              height={100}
            />
          ))}
      </div>
    </div>
  );
}
