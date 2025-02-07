import EditCategoryModalUI, {
  type EditCategoryModalFormValues,
} from '@/components/EditCategoryModalUI/EditCategoryModalUI';
import { addCategory, editCategory, type ICategory } from '@/utils/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

interface EditCategoryModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit: ICategory | null;
}

const editCategorySchema = z.object({
  categoryName: z.string().min(1, 'Category name is required'),
  description: z
    .string()
    .max(200, "Description can't exceed 200 characters")
    .optional(),
  schedule: z.object({
    days: z.array(z.string()),
    intervals: z.array(
      z.object({
        start: z.string(),
        end: z.string(),
      })
    ),
  }),
});

const EditCategoryModal = ({
  isOpen,
  onClose,
  categoryToEdit,
}: EditCategoryModalWrapperProps) => {
  const initialValues = {
    categoryName: categoryToEdit?.categoryName ?? '',
    description: categoryToEdit?.categoryDescription ?? '',
    schedule: categoryToEdit?.schedule ?? {
      days: [],
      intervals: [],
      alwaysOn: false,
    },
  };
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditCategoryModalFormValues>({
    defaultValues: initialValues,
    values: initialValues,
    resolver: zodResolver(editCategorySchema),
  });

  const getErrors = (field: keyof EditCategoryModalFormValues) =>
    errors[field]?.message;

  const onSubmit = async (data: EditCategoryModalFormValues) => {
    if (categoryToEdit) {
      await editCategory({
        id: categoryToEdit.id,
        categoryName: data.categoryName,
        categoryDescription: data.description,
        isEnabled: categoryToEdit.isEnabled,
        domains: categoryToEdit.domains,
        schedule: data.schedule,
      });
    } else {
      await addCategory({
        categoryName: data.categoryName,
        categoryDescription: data.description,
        id: uuidv4(),
        isEnabled: true,
        domains: [],
        schedule: data.schedule,
      });
    }
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
      isEdit={!!categoryToEdit}
    />
  );
};

export default EditCategoryModal;
