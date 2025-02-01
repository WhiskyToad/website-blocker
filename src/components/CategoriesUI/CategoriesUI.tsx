import type { ICategory } from '@/utils/categories';
import CategoryHeader from '../CategoryHeader/CategoryHeader';
import CategorySiteList from '../CategorySiteList/CategorySiteList';
import { FaPlus } from 'react-icons/fa';

export interface CategoryProps {
  categories: ICategory[];
  onAddCategory: () => void;
  onDeleteCategory: (id: string) => void;
  onEditCategory: (id: string) => void;
  toggleEnabled: (id: string) => void;
  onAddDomain: (id: string) => void;
}

const CategoriesUI = ({
  categories,
  onAddCategory,
  onDeleteCategory,
  onEditCategory,
  toggleEnabled,
  onAddDomain,
}: CategoryProps) => {
  return (
    <div className="p-6 space-y-6 bg-base-100 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          aria-label="Add new category"
          className="btn btn-primary flex items-center space-x-2"
          onClick={onAddCategory}
        >
          <FaPlus />
          <span>Add Category</span>
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 space-y-4 bg-neutral text-neutral-content rounded-lg shadow-lg"
          >
            <CategoryHeader
              categoryName={category.categoryName}
              description={category.categoryDescription ?? ''}
              categoryId={category.id}
              onDeleteCategory={onDeleteCategory}
              onEditCategory={onEditCategory}
              toggleEnabled={toggleEnabled}
              isEnabled={category.isEnabled}
              onAddDomain={onAddDomain}
            />
            <CategorySiteList blockedSites={category.domains} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesUI;
