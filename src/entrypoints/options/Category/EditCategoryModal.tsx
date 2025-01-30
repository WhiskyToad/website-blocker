import EditCategoryModalUI, {
  type EditCategoryModalFormValues,
} from '@/components/EditCategoryModalUI/EditCategoryModalUI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface EditCategoryModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: EditCategoryModalFormValues;
}

const editCategorySchema = z.object({
  categoryName: z.string().min(1, 'Category name is required'),
  description: z
    .string()
    .max(200, "Description can't exceed 200 characters")
    .optional(),
});

const EditCategoryModal = ({
  isOpen,
  onClose,
  initialValues = { categoryName: '', description: '' },
}: EditCategoryModalWrapperProps) => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditCategoryModalFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(editCategorySchema),
  });

  const getErrors = (field: keyof EditCategoryModalFormValues) =>
    errors[field]?.message;

  const onSubmit = (data: EditCategoryModalFormValues) => {
    console.log(data);
    onClose();
  };

  return (
    <EditCategoryModalUI
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      formValues={watch()}
      submitText="Save Changes"
      onChange={(f, v) => setValue(f, v, { shouldValidate: true })}
      getErrors={getErrors}
    />
  );
};

export default EditCategoryModal;
