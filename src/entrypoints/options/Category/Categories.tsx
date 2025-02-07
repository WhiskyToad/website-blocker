import CategoriesUI from '@/components/CategoriesUI/CategoriesUI';
import EditCategoryModal from './EditCategoryModal';
import {
  deleteCategory,
  editCategory,
  getCategories,
  ICategory,
} from '@/utils/categories';
import { useCallback, useEffect, useState } from 'react';
import AddDomainModal from './AddDomainModal';
import ConfirmDeleteModalUI from '@/components/ConfirmDeleteModalUI/ConfirmDeleteModalUI';
import EditScheduleModal from './EditScheduleModal';

type CategoriesModals =
  | 'none'
  | 'edit'
  | 'addDomain'
  | 'confirmDelete'
  | 'editSchedule';
const Categories = () => {
  const [openModal, setOpenModal] = useState<CategoriesModals>('none');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);
  const [confirmDeleteModalCallback, setConfirmDeleteModalCallback] = useState<
    () => void
  >(() => {});

  const fetchCategories = useCallback(async () => {
    const result = await getCategories();
    setCategories(result);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDeleteCategory = async (id: string) => {
    setConfirmDeleteModalCallback(() => async () => {
      await deleteCategory(id);
      handleCloseModals();
    });
    setOpenModal('confirmDelete');
  };

  const handleRemoveSite = (categoryId: string, domainToDelete: string) => {
    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      const removeDomainCallback = async () => {
        await editCategory({
          ...category,
          domains: category.domains.filter(
            (domain) => domain !== domainToDelete
          ),
        });
        handleCloseModals();
      };
      setConfirmDeleteModalCallback(() => removeDomainCallback);
      setOpenModal('confirmDelete');
    }
  };

  const handleEditModalOpen = (id: string, modalType: CategoriesModals) => {
    setCategoryToEdit(
      categories.find((category) => category.id === id) || null
    );
    setOpenModal(modalType);
  };

  const handleToggleEnabled = async (id: string) => {
    const category = categories.find((category) => category.id === id);
    if (category) {
      category.isEnabled = !category.isEnabled;
      await editCategory(category);
      fetchCategories();
    }
  };

  const handleCloseModals = () => {
    setOpenModal('none');
    setConfirmDeleteModalCallback(() => {});
    setCategoryToEdit(null);
    fetchCategories();
  };

  return (
    <>
      {categoryToEdit && (
        <>
          <AddDomainModal
            isOpen={openModal === 'addDomain'}
            category={categoryToEdit}
            onClose={handleCloseModals}
          />
          <EditScheduleModal
            isOpen={openModal === 'editSchedule'}
            onClose={handleCloseModals}
            categoryToEdit={categoryToEdit}
          />
        </>
      )}
      <EditCategoryModal
        isOpen={openModal === 'edit'}
        categoryToEdit={categoryToEdit}
        onClose={handleCloseModals}
      />
      <ConfirmDeleteModalUI
        isOpen={openModal === 'confirmDelete'}
        onClose={handleCloseModals}
        onConfirm={confirmDeleteModalCallback}
      />
      <CategoriesUI
        categories={categories}
        onAddCategory={() => setOpenModal('edit')}
        onDeleteCategory={handleDeleteCategory}
        onEditCategory={(id: string) => handleEditModalOpen(id, 'edit')}
        toggleEnabled={handleToggleEnabled}
        onAddDomain={(id: string) => handleEditModalOpen(id, 'addDomain')}
        onRemoveSite={handleRemoveSite}
        onEditSchedule={(id: string) => handleEditModalOpen(id, 'editSchedule')}
      />
    </>
  );
};

export default Categories;
