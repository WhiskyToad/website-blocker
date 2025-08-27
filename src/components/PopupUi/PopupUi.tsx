import { ICategory } from '@/utils/categories';

export interface PopupUiProps {
  categories: ICategory[];
  onToggleCategory: (categoryId: string) => void;
  onOpenOptions: () => void;
  onAddDomain: () => void;
}

const PopupUi = ({
  categories,
  onToggleCategory,
  onOpenOptions,
  onAddDomain,
}: PopupUiProps) => {
  const enabledCount = categories.filter(cat => cat.isEnabled).length;
  
  return (
    <div className="w-80 bg-base-100 text-base-content">
      {/* Header */}
      <div className="bg-primary text-primary-content p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Block Master</h1>
          <div className="badge badge-secondary">
            {enabledCount}/{categories.length} active
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm flex-1 gap-2" onClick={onOpenOptions}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
          <button className="btn btn-primary btn-sm flex-1 gap-2" onClick={onAddDomain}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Site
          </button>
        </div>

        {/* Category List */}
        {categories.length === 0 ? (
          <div className="text-center py-8 text-base-content/60">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
            </svg>
            <p>No categories yet</p>
            <p className="text-sm">Click Settings to create your first category</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                  cat.isEnabled 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'bg-base-200 hover:bg-base-300'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold truncate ${cat.isEnabled ? 'text-primary' : ''}`}>
                      {cat.categoryName}
                    </span>
                    {cat.isEnabled && (
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="text-xs text-base-content/60">
                    {cat.domains.length} site{cat.domains.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-sm"
                    checked={cat.isEnabled}
                    onChange={() => onToggleCategory(cat.id)}
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupUi;
