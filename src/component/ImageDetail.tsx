// ImageDetail.tsx

import { useState } from "react";
import Image from "next/image";

interface ImageDetailProps {
  images: { imageId: number; boardId: number; image_url: string }[];
}

export default function ImageDetail({ images }: ImageDetailProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return images.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  return (
    <div className="uploadedImg w-full h-100">
      <div className="relative overflow-hidden w-95 h-100 md:w-18 md:h-18 lg:w-18 lg:h-18">
        {images && images.length > 0 && (
          <div>
            <div className="image-slide">
              <Image
                key={images[currentIndex].imageId}
                src={images[currentIndex].image_url}
                alt={`Image ${currentIndex}`}
                width={100}
                height={100}
              />
            </div>
            <div className="button-group">
              <button onClick={handlePrevious}>.</button>
              <button onClick={handleNext}>.</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
