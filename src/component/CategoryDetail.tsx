interface CategoryDetailProps {
  category: string[];
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category }) => {
  return (
    <div className="pl-3 w-full mb-20">
      {category.map((subCategory, index) => (
        <button
          className="rounded-md border border-main text-main px-1 py-1 text-sm font-bold mt-5 mr-2"
          key={index}>
          {subCategory}
        </button>
      ))}
    </div>
  );
};

export default CategoryDetail;
