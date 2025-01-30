import CategoriesUI from '@/components/CategoriesUI/CategoriesUI';
import useModal from '@/entrypoints/hooks/useModal';
import EditCategoryModalWrapper from './EditCategoryModalWrapper';

const Categories = () => {
  const {
    visible: showEditCategoryModal,
    openModal: openEditCategoryModal,
    closeModal: closeEditCategoryModal,
  } = useModal();
  return (
    <>
      <EditCategoryModalWrapper
        isOpen={showEditCategoryModal}
        onClose={closeEditCategoryModal}
      />
      <CategoriesUI categories={[]} onAddCategory={openEditCategoryModal} />
    </>
  );
};

export default Categories;
