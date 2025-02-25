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
  return (
    <div className="w-72 p-4 bg-base-100 text-base-content">
      {/* Header */}
      <h1 className="text-xl font-bold mb-3">Block Master</h1>

      <div className="flex gap-2 mb-4">
        <button className="btn btn-secondary flex-1" onClick={onOpenOptions}>
          Options
        </button>
        <button className="btn btn-primary flex-1" onClick={onAddDomain}>
          Add Domain
        </button>
      </div>

      {/* Category List */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center bg-base-200 p-2 rounded-lg"
          >
            <span className="font-semibold">{cat.categoryName}</span>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={cat.isEnabled}
                onChange={() => onToggleCategory(cat.id)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopupUi;
