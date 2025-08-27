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
  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-base-content mb-2">No Categories Yet</h3>
          <p className="text-base-content/60 mb-6">Create your first category to start blocking websites and improve your productivity.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`bg-base-100 rounded-xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${
            category.isEnabled 
              ? 'border-primary/30 bg-primary/5' 
              : 'border-base-300 hover:border-base-400'
          }`}
        >
          {/* Status indicator */}
          <div className={`h-2 w-full rounded-t-xl ${category.isEnabled ? 'bg-primary' : 'bg-base-300'}`} />
          
          <div className="p-6 space-y-4">
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
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onEditSchedule(category.id)}
                className="btn btn-sm btn-secondary flex-1 gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Schedule
              </button>
              <button
                onClick={() => onAddDomain(category.id)}
                className="btn btn-sm btn-primary flex-1 gap-2"
              >
                <FaPlus className="w-3 h-3" />
                Add Site
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesUI;
