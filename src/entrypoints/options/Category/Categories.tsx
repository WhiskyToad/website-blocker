import CategoriesUI from '@/components/CategoriesUI/CategoriesUI';
import useModal from '@/entrypoints/hooks/useModal';
import EditCategoryModal from './EditCategoryModal';

const Categories = () => {
  const {
    visible: showEditCategoryModal,
    openModal: openEditCategoryModal,
    closeModal: closeEditCategoryModal,
  } = useModal();
  return (
    <>
      <EditCategoryModal
        isOpen={showEditCategoryModal}
        onClose={closeEditCategoryModal}
      />
      <CategoriesUI categories={[]} onAddCategory={openEditCategoryModal} />
    </>
  );
};

export default Categories;
