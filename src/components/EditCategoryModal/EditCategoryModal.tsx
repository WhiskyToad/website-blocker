import BaseModal from '../BaseModal/BaseModal';
import TextAreaInput from '../TextAreaInput/TextAreaInput';
import TextInput from '../TextInput/TextInput';

export interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  categoryName: string;
  description: string;
  onCategoryNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  submitText?: string;
}

const EditCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  categoryName,
  description,
  onCategoryNameChange,
  onDescriptionChange,
  submitText = 'Save Changes',
}: EditCategoryModalProps) => {
  return (
    <BaseModal
      title="Edit Category"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText={submitText}
    >
      <div className="space-y-4">
        <TextInput
          placeholder="Enter category name"
          value={categoryName}
          onChange={onCategoryNameChange}
          required
          label="Category Name"
        />
        <TextAreaInput
          placeholder="Enter category description (optional)"
          value={description}
          onChange={onDescriptionChange}
          label="Description"
        />
      </div>
    </BaseModal>
  );
};

export default EditCategoryModal;
