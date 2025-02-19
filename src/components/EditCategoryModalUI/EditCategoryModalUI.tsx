import type { ISchedule } from '@/utils/categories';
import BaseModal from '../BaseModal/BaseModal';
import CreateScheduleUI from '../CreateScheduleUI/CreateScheduleUI';
import TextAreaInput from '../TextAreaInput/TextAreaInput';
import TextInput from '../TextInput/TextInput';

export interface EditCategoryModalFormValues {
  categoryName: string;
  description: string;
  schedule: ISchedule;
}

export interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    field: keyof EditCategoryModalFormValues,
    value: string | ISchedule
  ) => void;
  getErrors: (field: keyof EditCategoryModalFormValues) => string | undefined;
  formValues: EditCategoryModalFormValues;
  submitText?: string;
  isEdit: boolean;
  onDelete: () => void;
}

const EditCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
  getErrors,
  formValues,
  submitText = 'Save Changes',
  isEdit,
  onDelete,
}: EditCategoryModalProps) => {
  return (
    <form onSubmit={onSubmit}>
      <BaseModal
        title={isEdit ? 'Edit Category' : 'Create Category'}
        isOpen={isOpen}
        onClose={onClose}
        submitText={submitText}
        submitButtonType="submit"
        showDeleteButton={isEdit}
        onDelete={onDelete}
      >
        <div className="flex flex-col gap-4">
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
          <CreateScheduleUI onChange={onChange} formValues={formValues} />
        </div>
      </BaseModal>
    </form>
  );
};

export default EditCategoryModal;
