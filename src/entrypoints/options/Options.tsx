import CategoriesUI from '@/components/CategoriesUI/CategoriesUI';
import {
  deleteCategory,
  editCategory,
  getCategories,
  ICategory,
} from '@/utils/categories';
import { useCallback, useEffect, useState } from 'react';
import ConfirmDeleteModalUI from '@/components/ConfirmDeleteModalUI/ConfirmDeleteModalUI';
import EditScheduleModal from './Category/EditScheduleModal';
import AddDomainModal from './Category/AddDomainModal';
import EditCategoryModal from './Category/EditCategoryModal';
import BlockedSitesHeader from '@/components/BlockedSitesHeader/BlockedSitesHeader';
import useModal from '../hooks/useModal';

type CategoriesModals = 'none' | 'edit' | 'addDomain' | 'editSchedule';
const Options = () => {
  const {
    visible: showDeleteModal,
    openModal: openDeleteModal,
    closeModal,
  } = useModal();
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
    const callback = () => {
      fetchCategories();
      closeModal();
    };
    setConfirmDeleteModalCallback(() => async () => {
      await deleteCategory(id);
      callback();
    });
    openDeleteModal();
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
      openDeleteModal();
    }
  };

  const handleEditModalOpen = (id: string, modalType: CategoriesModals) => {
    const category = categories.find((category) => category.id === id);
    if (!category) {
      return;
    }
    setCategoryToEdit(category);
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
        handleDeleteCategory={handleDeleteCategory}
      />
      <ConfirmDeleteModalUI
        isOpen={showDeleteModal}
        onClose={handleCloseModals}
        onConfirm={confirmDeleteModalCallback}
      />
      <BlockedSitesHeader onAddCategory={() => setOpenModal('edit')} />
      <CategoriesUI
        categories={categories}
        onEditCategory={(id: string) => handleEditModalOpen(id, 'edit')}
        toggleEnabled={handleToggleEnabled}
        onAddDomain={(id: string) => handleEditModalOpen(id, 'addDomain')}
        onRemoveSite={handleRemoveSite}
        onEditSchedule={(id: string) => handleEditModalOpen(id, 'editSchedule')}
      />
    </>
  );
};

export default Options;
