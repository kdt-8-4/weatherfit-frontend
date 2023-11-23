import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import "../style/imageUpload.scss";

interface ImageUploadProps {
  onImagesSelected: (files: File[] | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesSelected,
}: ImageUploadProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

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
