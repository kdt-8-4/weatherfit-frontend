import { useState } from "react";
import Image from "next/image";
import "../style/selectCategory.scss";

interface SelectCategoryProps {
  category: string;
  subCategories: string[];
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  category,
  subCategories,
}) => {
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    [],
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isImageFlipped, setIsImageFlipped] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    handleImageFlip();
  };

  const selectSubCategory = (subCategory: string) => {
    const index = selectedSubCategories.indexOf(subCategory);

    if (index === -1) {
      setSelectedSubCategories([...selectedSubCategories, subCategory]);
    } else {
      const updatedSubCategories = selectedSubCategories.filter(
        (item) => item !== subCategory,
      );
      setSelectedSubCategories(updatedSubCategories);
    }
  };

  const handleImageFlip = () => {
    setIsImageFlipped(!isImageFlipped);
  };

  return (
    <>
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
          {category}
          <Image
            className={`img ${isImageFlipped ? "flip-image" : ""}`}
            src="/images/toggle.svg"
            alt="toggle"
            width={10}
            height={10}
          />
        </button>
        {showDropdown && (
          <div className="dropdown-content">
            {subCategories.map((subCategory, index) => (
              <button
                key={index}
                onClick={() => selectSubCategory(subCategory)}>
                {subCategory}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectCategory;
