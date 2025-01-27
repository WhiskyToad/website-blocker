import { IoMdRemoveCircleOutline } from 'react-icons/io';

export interface CategorySiteListProps {
  blockedSites: string[];
}

const CategorySiteList = ({ blockedSites }: CategorySiteListProps) => {
  return (
    <div className="collapse collapse-arrow bg-neutral text-neutral-content rounded-lg shadow-md">
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-lg font-bold flex items-center justify-between">
        <span>Blocked Websites</span>
        <span className="badge badge-secondary">{blockedSites.length}</span>
      </div>
      <div className="collapse-content space-y-2">
        {blockedSites.length > 0 ? (
          blockedSites.map((site, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-base-100 rounded-lg shadow-sm"
            >
              <span className="text-sm truncate">{site}</span>
              <button
                aria-label={`Remove ${site}`}
                className="btn btn-error btn-sm flex items-center space-x-1"
              >
                <IoMdRemoveCircleOutline size={16} />
                <span>Remove</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No sites blocked yet.</p>
        )}
      </div>
    </div>
  );
};

export default CategorySiteList;
