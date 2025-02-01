import CategoriesUI from '@/components/CategoriesUI/CategoriesUI';
import useModal from '@/entrypoints/hooks/useModal';
import EditCategoryModal from './EditCategoryModal';
import {
  deleteCategory,
  editCategory,
  getCategories,
  ICategory,
} from '@/utils/categories';
import { useCallback, useEffect, useState } from 'react';
import AddDomainModal from './AddDomainModal';

const Categories = () => {
  const {
    visible: showEditCategoryModal,
    openModal: openEditCategoryModal,
    closeModal: closeEditCategoryModal,
  } = useModal();
  const {
    visible: showAddDomainModal,
    openModal: openAddDomainModal,
    closeModal: closeAddDomainModal,
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

  const handleCloseModals = () => {
    closeEditCategoryModal();
    closeAddDomainModal();
    setCategoryToEdit(null);
    fetchCategories();
  };

  const handleToggleEnabled = async (id: string) => {
    const category = categories.find((category) => category.id === id);
    if (category) {
      category.isEnabled = !category.isEnabled;
      await editCategory(category);
      fetchCategories();
    }
  };

  const handleShowAddDomainModal = (id: string) => {
    setCategoryToEdit(
      categories.find((category) => category.id === id) || null
    );
    openAddDomainModal();
  };
  return (
    <>
      <EditCategoryModal
        isOpen={showEditCategoryModal}
        categoryToEdit={categoryToEdit}
        onClose={handleCloseModals}
      />
      {categoryToEdit && (
        <AddDomainModal
          isOpen={showAddDomainModal}
          category={categoryToEdit}
          onClose={handleCloseModals}
        />
      )}
      <CategoriesUI
        categories={categories}
        onAddCategory={openEditCategoryModal}
        onDeleteCategory={handleDeleteCategory}
        onEditCategory={handleEditCategory}
        toggleEnabled={handleToggleEnabled}
        onAddDomain={handleShowAddDomainModal}
        onRemoveSite={() => {}}
      />
    </>
  );
};

export default Categories;
