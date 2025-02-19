import { use, useCallback, useEffect, useState } from 'react';
import { browser } from 'wxt/browser';
import { ICategory, editCategory, getCategories } from '@/utils/categories';
import PopupUi from '@/components/PopupUi/PopupUi';

function Popup() {
  const [categories, setCategories] = useState<ICategory[]>([]);

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
