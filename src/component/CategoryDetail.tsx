interface CategoryDetailProps {
  category: string[];
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category }) => {
  return (
    <div className="pl-3 w-full">
      {category.map((subCategory, index) => (
        <button
          className="rounded-md border border-main text-main px-1 py-1 text-sm font-medium mt-5 mr-5"
          key={index}>
          {subCategory}
        </button>
      ))}
    </div>
  );
};

export default CategoryDetail;
