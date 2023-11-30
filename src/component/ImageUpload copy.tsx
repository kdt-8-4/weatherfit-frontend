import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import "../style/imageUpload.scss";
import { editBoardIdState } from "@/recoilAtom/EditDetail";
import { useRecoilState } from "recoil";
import axios from "axios";

interface ImageUploadProps {
  onImagesSelected: (files: File[] | null) => void;
  initialImages?: File[]; // 추가
  initialImagesURLs?: string[]; // 기존 이미지 URL
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesSelected,
  initialImages = [],
  initialImagesURLs = [],
}: ImageUploadProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>(initialImages);
  const [existingImages, setExistingImages] =
    useState<string[]>(initialImagesURLs);

  const [editBoardId, setEditBoardId] = useRecoilState(editBoardIdState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (editBoardId) {
          const response = await axios({
            method: "GET",
            url: `https://www.jerneithe.site/board/detail/${editBoardId}`,
          });
          console.log(response.data);
          const boardDetailData = response.data;
          setSelectedImages(boardDetailData.images);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (editBoardId) fetchData();
  }, [editBoardId]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const totalSize = filesArray.reduce((acc, file) => acc + file.size, 0);

      const maxSize = 10 * 1024 * 1024; //10MB
      if (totalSize > maxSize) {
        alert("이미지는 최대 10MB까지 올릴 수 있습니다.");
        return;
      }

      const combinedImages = [...selectedImages, ...filesArray];
      setSelectedImages(combinedImages);
      onImagesSelected(combinedImages); //부모 컴포넌트로 File[] 전달
    }
  };

  const removeImage = (index: number) => {
    if (index < selectedImages.length) {
      const newImages = [...selectedImages];
      newImages.splice(index, 1);
      setSelectedImages(newImages);
      onImagesSelected(newImages);
    } else {
      const newImagesURLs = [...existingImages];
      newImagesURLs.splice(index - selectedImages.length, 1);
      setExistingImages(newImagesURLs);
    }
  };

  return (
    <div className="upload_images">
      <div className="uploaded_images">
        {selectedImages &&
          Array.from(selectedImages).map((image, index) => (
            <div key={index} className="image-preview">
              <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
              <button onClick={() => removeImage(index)}>삭제</button>
            </div>
          ))}
        {existingImages &&
          existingImages.map((url, index) => (
            <div key={index + selectedImages.length} className="image-preview">
              <img src={url} alt={`Image ${index}`} />
              <button
                onClick={() => removeImage(index + selectedImages.length)}>
                삭제
              </button>
            </div>
          ))}

        <label htmlFor="upload-input">
          <div className="add-div">
            <Image
              src={"/images/add.svg"}
              alt="plus"
              width={24}
              height={24}
              priority
            />
            <input
              id="upload-input"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e)}
              style={{ display: "none" }}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
