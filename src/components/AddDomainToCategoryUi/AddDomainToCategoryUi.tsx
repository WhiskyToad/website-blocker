export interface AddDomainToCategoryUiProps {
  categories: CategoryFormData[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  error?: string;
}

interface CategoryFormData {
  categoryId: string;
  name: string;
}

const AddDomainToCategoryUi = ({
  categories,
  selectedCategory,
  onCategoryChange,
  error,
}: AddDomainToCategoryUiProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="form-control w-full">
        <select
          className={`select select-bordered w-full ${error ? 'select-error' : ''}`}
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-invalid={error ? 'true' : 'false'}
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
        {error && <div className="text-error text-sm mt-1">{error}</div>}
      </div>
      <div className="flex justify-end gap-2">
        <button className="btn btn-primary" type="submit">
          OK
        </button>
      </div>
    </div>
  );
};

export default AddDomainToCategoryUi;
