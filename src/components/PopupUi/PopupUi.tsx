import { ICategory } from '@/utils/categories';

export interface PopupUiProps {
  categories: ICategory[];
  onToggleCategory: (id: string) => void;
  onOpenOptions: () => void;
}

const PopupUi = ({
  categories,
  onToggleCategory,
  onOpenOptions,
}: PopupUiProps) => {
  return (
    <div className="w-72 p-4 bg-base-100 text-base-content">
      {/* Header */}
      <h1 className="text-xl font-bold mb-3">Block Master</h1>

      {/* Link to Options */}
      <button className="btn btn-secondary w-full mb-4" onClick={onOpenOptions}>
        Manage Options
      </button>

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
