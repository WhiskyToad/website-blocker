import { IoMdRemoveCircleOutline } from 'react-icons/io';

export interface CategorySiteListProps {
  blockedSites: string[];
  onRemoveSite: (site: string) => void;
}

const CategorySiteList = ({
  blockedSites,
  onRemoveSite,
}: CategorySiteListProps) => {
  return (
    <div className="bg-neutral text-neutral-content rounded-lg p-4">
      <div className="space-y-2">
        {blockedSites.length > 0 ? (
          blockedSites.map((site, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-base-100 rounded-lg shadow-sm"
            >
              <span className="text-sm truncate">{site}</span>
              <button
                aria-label={`Remove ${site}`}
                className="btn btn-error btn-sm flex items-center space-x-1 btn-outline"
                onClick={() => onRemoveSite(site)}
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
