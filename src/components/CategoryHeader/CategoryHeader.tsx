import { MdOutlineTimer, MdOutlineDeleteOutline } from 'react-icons/md';
import { FaPlus, FaRegEdit } from 'react-icons/fa';

export interface CategoryHeaderProps {
  categoryName: string;
  description: string;
}

const CategoryHeader = ({ categoryName, description }: CategoryHeaderProps) => {
  return (
    <div className="p-4 bg-neutral text-neutral-content rounded-lg">
      <div className="flex justify-between items-center mb-2">
        {/* Category Title and Edit Button */}
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-bold">{categoryName}</h3>
          <button
            aria-label={`Edit ${categoryName}`}
            className="btn btn-circle btn-sm btn-ghost"
          >
            <FaRegEdit size={16} />
          </button>
          <button
            aria-label={`Delete ${categoryName}`}
            className="btn btn-circle btn-sm btn-ghost"
          >
            <MdOutlineDeleteOutline size={16} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            className="btn btn-primary btn-sm flex items-center space-x-2"
            aria-label={`Add a site to ${categoryName}`}
          >
            <FaPlus size={16} />
            <span>Add Site</span>
          </button>
          <button
            className="btn btn-secondary btn-sm flex items-center space-x-2"
            aria-label={`Set schedule for ${categoryName}`}
          >
            <MdOutlineTimer size={16} />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      {/* Category Description */}
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default CategoryHeader;
