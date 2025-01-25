export interface CategoryHeaderProps {
  categoryName: string;
  description: string;
}

const CategoryHeader = ({ categoryName, description }: CategoryHeaderProps) => {
  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">{categoryName}</h1>
        <button className="btn btn-primary">Schedule</button>
      </div>
      <p className="mb-4">{description}</p>
    </div>
  );
};

export default CategoryHeader;
