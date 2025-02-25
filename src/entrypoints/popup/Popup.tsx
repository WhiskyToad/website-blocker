import { useCallback, useEffect, useState } from 'react';
import { browser } from 'wxt/browser';
import { ICategory, editCategory, getCategories } from '@/utils/categories';
import PopupUi from '@/components/PopupUi/PopupUi';
import AddDomainToCategory from './AddDomainToCategory';

function Popup() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showAddDomain, setShowAddDomain] = useState(false);

  const fetchCategories = useCallback(async () => {
    const result = await getCategories();
    setCategories(result);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Handle toggling a category on/off
  const handleToggleCategory = async (categoryId: string) => {
    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      category.isEnabled = !category.isEnabled;
      await editCategory(category);
      fetchCategories();
    }
  };

  if (showAddDomain) {
    return (
      <div className="w-72 p-4 bg-base-100 text-base-content">
        <button
          className="btn btn-ghost mb-4"
          onClick={() => setShowAddDomain(false)}
        >
          ← Back
        </button>
        <AddDomainToCategory />
      </div>
    );
  }

  // Navigate to options page
  const handleOpenOptions = () => {
    browser.runtime.openOptionsPage();
  };

  return (
    <PopupUi
      categories={categories}
      onOpenOptions={handleOpenOptions}
      onToggleCategory={handleToggleCategory}
    />
  );
}

export default Popup;
