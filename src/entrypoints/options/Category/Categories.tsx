import CategoriesUI from '@/components/CategoriesUI/CategoriesUI';
import useModal from '@/entrypoints/hooks/useModal';
import EditCategoryModal from './EditCategoryModal';
import { deleteCategory, getCategories, ICategory } from '@/utils/categories';
import { useCallback, useEffect, useState } from 'react';

const Categories = () => {
  const {
    visible: showEditCategoryModal,
    openModal: openEditCategoryModal,
    closeModal: closeEditCategoryModal,
  } = useModal();

  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = useCallback(async () => {
    const result = await getCategories();
    setCategories(result);
  }, []);

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <EditCategoryModal
        isOpen={showEditCategoryModal}
        onClose={() => {
          closeEditCategoryModal();
          fetchCategories();
        }}
      />
      <CategoriesUI
        categories={categories}
        onAddCategory={openEditCategoryModal}
        onDeleteCategory={handleDeleteCategory}
      />
    </>
  );
};

export default Categories;
