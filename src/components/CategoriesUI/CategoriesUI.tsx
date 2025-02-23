import type { ICategory } from '@/utils/categories';
import CategoryHeader from '../CategoryHeader/CategoryHeader';
import CategorySiteList from '../CategorySiteList/CategorySiteList';
import { FaPlus } from 'react-icons/fa';

export interface CategoryProps {
  categories: ICategory[];
  onEditCategory: (id: string) => void;
  toggleEnabled: (id: string) => void;
  onAddDomain: (id: string) => void;
  onRemoveSite: (categoryId: string, site: string) => void;
  onEditSchedule: (id: string) => void;
}

const CategoriesUI = ({
  categories,
  onEditCategory,
  toggleEnabled,
  onAddDomain,
  onRemoveSite,
  onEditSchedule,
}: CategoryProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 max-w-[1600px] mx-auto">
      {categories.map((category) => (
        <div
          key={category.id}
          className="p-6 space-y-4 bg-neutral text-neutral-content rounded-lg shadow-lg min-w-[400px]"
        >
          <CategoryHeader
            categoryName={category.categoryName}
            description={category.categoryDescription ?? ''}
            categoryId={category.id}
            onEditCategory={onEditCategory}
            toggleEnabled={toggleEnabled}
            isEnabled={category.isEnabled}
          />
          <CategorySiteList
            blockedSites={category.domains}
            onRemoveSite={(site) => onRemoveSite(category.id, site)}
          />
          <div className="flex justify-between">
            <button
              onClick={() => onEditSchedule(category.id)}
              className="btn btn-sm btn-secondary"
            >
              Schedule
            </button>
            <button
              onClick={() => onAddDomain(category.id)}
              className="btn btn-sm btn-primary"
            >
              <FaPlus className="mr-2" />
              Add Site
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesUI;
