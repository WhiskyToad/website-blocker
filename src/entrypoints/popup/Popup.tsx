import { useEffect, useState } from 'react';
import { browser } from 'wxt/browser';
import { ICategory, editCategory, getCategories } from '@/utils/categories';
import PopupUi from '@/components/PopupUi/PopupUi';

function Popup() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // Handle toggling a category on/off
  const handleToggleCategory = async (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;
    const editedCategory = { ...category, enabled: !category.isEnabled };
    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId ? editedCategory : cat
    );
    await editCategory(editedCategory);
    setCategories(updatedCategories);
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
