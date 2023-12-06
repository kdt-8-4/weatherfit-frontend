// ImageDetail.tsx

import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageDetailProps {
  images: { imageId: number; boardId: number; imageUrl: string }[];
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
    <div className="uploadedImg w-full h-100 p-3">
      <div className="relative overflow-hidden w-95 h-80">
        {images && images.length > 0 && (
          <div>
            <div className="image-slide">
              <div
                className="image-container relative"
                style={{ aspectRatio: "1.2/1.5" }}>
                <div
                  className="image-wrapper"
                  style={{ paddingBottom: "100%" }}>
                  <Image
                    key={images[currentIndex].imageId}
                    src={images[currentIndex].imageUrl}
                    alt={`Image ${currentIndex}`}
                    layout="fill"
                  />
                </div>
              </div>
            </div>
            {images.length > 1 && (
              <div
                className="button-group absolute flex w-full"
                style={{
                  padding: "10px",
                  position: "absolute",
                  top: "50%",
                  justifyContent: "space-between",
                  transform: "translateY(-50%)",
                }}>
                <button onClick={handlePrevious}>◀️</button>
                <button onClick={handleNext}>▶️</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
