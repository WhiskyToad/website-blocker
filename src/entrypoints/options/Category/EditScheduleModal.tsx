import { editCategory, type ICategory } from '@/utils/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BaseModal from '@/components/BaseModal/BaseModal';
import CreateScheduleUI, {
  type CreateScheduleFormValues,
} from '@/components/CreateScheduleUI/CreateScheduleUI';

interface EditScheduleModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit: ICategory;
}

const editScheduleSchema = z.object({
  schedule: z.object({
    alwaysOn: z.boolean(),
    days: z.array(z.string()),
    intervals: z.array(
      z.object({
        start: z.string(),
        end: z.string(),
      })
    ),
  }),
});
const EditScheduleModal = ({
  isOpen,
  onClose,
  categoryToEdit,
}: EditScheduleModalWrapperProps) => {
  const initialValues = {
    schedule: categoryToEdit.schedule,
  };
  const { handleSubmit, watch, setValue } = useForm<CreateScheduleFormValues>({
    defaultValues: initialValues,
    values: initialValues,
    resolver: zodResolver(editScheduleSchema),
  });

  const onSubmit = async (data: CreateScheduleFormValues) => {
    const { days, intervals, alwaysOn } = data.schedule;
    await editCategory({
      ...categoryToEdit,
      schedule: { days, intervals, alwaysOn },
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseModal
        title={`Edit Schedule for ${categoryToEdit.categoryName}`}
        isOpen={isOpen}
        onClose={onClose}
        submitText="Save"
        submitButtonType="submit"
      >
        <CreateScheduleUI
          formValues={watch()}
          onChange={(f, v) => setValue(f, v, { shouldValidate: true })}
        />
      </BaseModal>
    </form>
  );
};

export default EditScheduleModal;
