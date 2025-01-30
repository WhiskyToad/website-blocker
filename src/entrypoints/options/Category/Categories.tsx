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
  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);

  const fetchCategories = useCallback(async () => {
    const result = await getCategories();
    setCategories(result);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  //TODO - confirm modal
  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id);
    fetchCategories();
  };

  const handleEditCategory = (id: string) => {
    setCategoryToEdit(
      categories.find((category) => category.id === id) || null
    );
    openEditCategoryModal();
  };

  const handleCloseEditCategoryModal = () => {
    closeEditCategoryModal();
    setCategoryToEdit(null);
    fetchCategories();
  };

  return (
    <>
      <EditCategoryModal
        isOpen={showEditCategoryModal}
        categoryToEdit={categoryToEdit}
        onClose={handleCloseEditCategoryModal}
      />
      <CategoriesUI
        categories={categories}
        onAddCategory={openEditCategoryModal}
        onDeleteCategory={handleDeleteCategory}
        onEditCategory={handleEditCategory}
      />
    </>
  );
};

export default Categories;
