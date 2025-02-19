import { FaRegEdit } from 'react-icons/fa';
import BaseToggle from '../BaseToggle/BaseToggle';

export interface CategoryHeaderProps {
  categoryName: string;
  description: string;
  categoryId: string;
  isEnabled: boolean;
  onEditCategory: (id: string) => void;
  toggleEnabled: (id: string) => void;
}

const CategoryHeader = ({
  categoryName,
  description,
  isEnabled,
  categoryId,
  onEditCategory,
  toggleEnabled,
}: CategoryHeaderProps) => {
  return (
    <div className="p-4 bg-neutral text-neutral-content rounded-lg">
      <div className="flex justify-between items-center mb-3">
        {/* Category Title */}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{categoryName}</h3>
            <button
              aria-label={`Edit ${categoryName}`}
              className="btn btn-circle btn-sm btn-primary btn-ghost"
              onClick={() => onEditCategory(categoryId)}
            >
              <FaRegEdit size={16} />
            </button>
          </div>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>

        {/* Toggle and Actions */}
        <div className="flex justify-start space-x-4">
          <BaseToggle
            hideLabel
            checked={isEnabled}
            label="Enabled"
            onClick={() => toggleEnabled(categoryId)}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
