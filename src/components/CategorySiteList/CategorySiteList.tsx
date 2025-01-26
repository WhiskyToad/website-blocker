import { IoMdRemoveCircleOutline } from 'react-icons/io';

export interface CategorySiteListProps {
  blockedSites: string[];
}

const CategorySiteList = ({ blockedSites }: CategorySiteListProps) => {
  return (
    <div className="collapse collapse-arrow">
      <input type="radio" name="my-accordion-3" />
      <div className="collapse-title text-xl font-medium">Blocked Websites</div>
      <div className="collapse-content">
        {blockedSites.map((site, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between p-2 border-b border-base-300"
          >
            <div>{site}</div>
            <button className="btn btn-error btn-outline btn-small">
              <IoMdRemoveCircleOutline size={16} />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySiteList;
