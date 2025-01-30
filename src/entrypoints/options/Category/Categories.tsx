import CategoriesUI from '@/components/CategoriesUI/CategoriesUI';
import useModal from '@/entrypoints/hooks/useModal';
import EditCategoryModal from './EditCategoryModal';
import { getCategories, ICategory } from '@/utils/categories';
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
      />
    </>
  );
};

export default Categories;
