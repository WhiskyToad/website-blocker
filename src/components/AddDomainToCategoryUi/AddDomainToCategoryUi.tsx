export interface AddDomainToCategoryUiProps {
  categories: CategoryFormData[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onCancel: () => void;
}

interface CategoryFormData {
  categoryId: string;
  name: string;
}

const AddDomainToCategoryUi = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onCancel,
}: AddDomainToCategoryUiProps) => {
  return (
    <div className="flex flex-col gap-4">
      <select
        className="select select-bordered w-full"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option disabled value="">
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="flex justify-end gap-2">
        <button className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          OK
        </button>
      </div>
    </div>
  );
};

export default AddDomainToCategoryUi;
