import { MdOutlineTimer, MdOutlineDeleteOutline } from 'react-icons/md';
import { FaPlus, FaRegEdit } from 'react-icons/fa';
import BaseToggle from '../BaseToggle/BaseToggle';

export interface CategoryHeaderProps {
  categoryName: string;
  description: string;
  categoryId: string;
  onDeleteCategory: (id: string) => void;
}

const CategoryHeader = ({
  categoryName,
  description,
  onDeleteCategory,
  categoryId,
}: CategoryHeaderProps) => {
  return (
    <div className="p-4 bg-neutral text-neutral-content rounded-lg">
      <div className="flex justify-between items-center mb-3">
        {/* Category Title */}
        <div>
          <h3 className="text-xl font-bold">{categoryName}</h3>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>

        {/* Toggle and Actions */}
        <div className="flex items-center space-x-4">
          <BaseToggle checked={true} label="Enabled" onClick={() => {}} />
          <button
            aria-label={`Edit ${categoryName}`}
            className="btn btn-circle btn-sm btn-ghost"
          >
            <FaRegEdit size={16} />
          </button>
          <button
            aria-label={`Delete ${categoryName}`}
            onClick={() => onDeleteCategory(categoryId)}
            className="btn btn-circle btn-sm btn-ghost"
          >
            <MdOutlineDeleteOutline size={16} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-2">
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
  );
};

export default CategoryHeader;
