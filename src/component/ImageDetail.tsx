import { useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

const Button = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgba(240, 248, 255, 0.4901960784);
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
                style={{ aspectRatio: "1.2/1.5" }}
              >
                <div
                  className="image-wrapper"
                  style={{ paddingBottom: "100%" }}
                >
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
                }}
              >
                <Button onClick={handlePrevious} className="move_btn">
                  <FiChevronLeft />
                </Button>
                <Button onClick={handleNext} className="move_btn">
                  <FiChevronRight />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// width: "25px",
// height: "25px",
// borderRadius: "50%",
// backgroundColor: "rgba(240, 248, 255, 0.4901960784)",
// display: flex;
// align-items: center;
// justify-content: center;
