import BaseModal from '../BaseModal/BaseModal';
import TextAreaInput from '../TextAreaInput/TextAreaInput';
import TextInput from '../TextInput/TextInput';

export interface EditCategoryModalFormValues {
  categoryName: string;
  description: string;
}

export interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof EditCategoryModalFormValues, value: string) => void;
  getErrors: (field: keyof EditCategoryModalFormValues) => string | undefined;
  formValues: EditCategoryModalFormValues;
  submitText?: string;
}

const EditCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
  getErrors,
  formValues,
  submitText = 'Save Changes',
}: EditCategoryModalProps) => {
  return (
    <form onSubmit={onSubmit}>
      <BaseModal
        title="Edit Category"
        isOpen={isOpen}
        onClose={onClose}
        submitText={submitText}
        submitButtonType="submit"
      >
        <div className="space-y-4">
          <TextInput
            placeholder="Enter category name"
            value={formValues.categoryName}
            onChange={(value) => onChange('categoryName', value)}
            required
            label="Category Name"
            error={getErrors('categoryName')}
          />
          <TextAreaInput
            placeholder="Enter category description (optional)"
            value={formValues.description}
            onChange={(value) => onChange('description', value)}
            label="Description"
            error={getErrors('description')}
          />
        </div>
      </BaseModal>
    </form>
  );
};

export default EditCategoryModal;
