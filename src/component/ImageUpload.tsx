import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import "../style/imageUpload.scss";

interface Image {
  imageId: number;
  imageUrl: string;
}
interface ImageUploadProps {
  onImagesSelected: (files: File[] | null) => void;
  initialImages: Image[];
  onDeleteImage?: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesSelected,
  initialImages,
  onDeleteImage = () => {},
}: ImageUploadProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<Image[]>(initialImages);
  const [deletedImages, setDeletedImages] = useState<string[]>([]); // 추가된 상태

  useEffect(() => {
    setExistingImages(initialImages);
    console.log("setExistingImages", initialImages);
  }, [initialImages]);

  useEffect(() => {
    console.log("selectedImages", selectedImages);
  }, [selectedImages]);

  useEffect(() => {
    console.log("existingImages", existingImages);
  }, [existingImages]);

  useEffect(()=>{
    console.log("onImageSelect");
  }, [onImagesSelected])

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
    if (selectedImages) {
      const newImages = [...selectedImages];
      newImages.splice(index, 1);
      setSelectedImages(newImages);
      onImagesSelected(newImages);
    }
  };

  const removeExistingImage = (index: number, url: string) => {
    if (existingImages) {
      const newImages = [...existingImages];
      newImages.splice(index, 1);
      setExistingImages(newImages);
      onDeleteImage(url); // 상위 컴포넌트에 삭제된 이미지의 URL 전달
    }
  };

  return (
    <div className="upload_images">
      <div className="uploaded_images">
        {existingImages &&
          Array.from(existingImages).map((image, index) => (
            <div key={index} className="image-preview">
              <img src={image.imageUrl} alt={`Image ${index}`} />
              <button
                onClick={() => removeExistingImage(index, image.imageUrl)}>
                ❌
              </button>
            </div>
          ))}
        {selectedImages &&
          Array.from(selectedImages).map((image, index) => (
            <div key={index} className="image-preview">
              <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
              <button onClick={() => removeImage(index)}>❌</button>
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
