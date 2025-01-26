import { MdOutlineTimer } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';

export interface CategoryHeaderProps {
  categoryName: string;
  description: string;
}

const CategoryHeader = ({ categoryName, description }: CategoryHeaderProps) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-2">
        <h3 className="text-xl">{categoryName}</h3>
        <div className="flex flex-row space-x-2">
          <button className="btn btn-primary text-sm p-2">
            <FaPlus size={24} />
            Add Site
          </button>
          <button className="btn btn-primary text-sm p-2">
            <MdOutlineTimer size={24} />
            Schedule
          </button>
        </div>
      </div>
      <p className="mb-4">{description}</p>
    </div>
  );
};

export default CategoryHeader;
