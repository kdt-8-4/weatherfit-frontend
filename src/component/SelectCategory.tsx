import { useState, useEffect } from "react";
import Image from "next/image";
import "../style/selectCategory.scss";

interface SelectCategoryProps {
  category: string;
  subCategories: string[];
  onSelect: (subCategory: string[]) => void; // 선택한 하위 카테고리 부모 컴포넌트로 전송
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  category,
  subCategories,
  onSelect,
}) => {
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    [],
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isImageFlipped, setIsImageFlipped] = useState<boolean>(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setIsImageFlipped(!isImageFlipped);
  };

  const selectSubCategory = (subCategory: string) => {
    const index = selectedSubCategories.indexOf(subCategory);
    let updatedSubCategories: string[] = [];

    if (index === -1) {
      updatedSubCategories = [...selectedSubCategories, subCategory];
      setSelectedSubCategories(updatedSubCategories);
    } else {
      updatedSubCategories = selectedSubCategories.filter(
        (item) => item !== subCategory,
      );
      setSelectedSubCategories(updatedSubCategories);
    }
    onSelect(updatedSubCategories); // 선택 사항을 부모 컴포넌트에 바로 반영
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
                className={`btn ${
                  selectedSubCategories.includes(subCategory)
                    ? "selected"
                    : "non_selected"
                }`}
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
