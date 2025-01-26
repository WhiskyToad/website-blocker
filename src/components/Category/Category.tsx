import type { CategoryHeaderProps } from '../CategoryHeader/CategoryHeader';
import CategoryHeader from '../CategoryHeader/CategoryHeader';
import type { CategorySiteListProps } from '../CategorySiteList/CategorySiteList';
import CategorySiteList from '../CategorySiteList/CategorySiteList';

export interface CategoryProps {
  categories: {
    categoryHeaderData: CategoryHeaderProps;
    categorySiteListData: CategorySiteListProps;
  }[];
}

const Category = ({ categories }: CategoryProps) => {
  return (
    <div className="p4 space-y-4">
      <h2 className="text-3xl text-center">Categories</h2>
      <div className="">
        {categories.map((category, index) => (
          <div
            key={index}
            className="mb-4 p-4 space-y-4 bg-base-200 rounded-box"
          >
            <CategoryHeader {...category.categoryHeaderData} />
            <CategorySiteList {...category.categorySiteListData} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
