import { editCategory, type ICategory } from '@/utils/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import AddDomainModalUI, {
  type AddDomainModalFormValues,
} from '@/components/AddDomainModalUI/AddDomainModalUI';

interface AddDomainModalPropsProps {
  isOpen: boolean;
  onClose: () => void;
  category: ICategory;
}

const editCategorySchema = z.object({
  domainName: z.string().min(1, 'Domain name is required'),
});

const AddDomainModal = ({
  isOpen,
  onClose,
  category,
}: AddDomainModalPropsProps) => {
  const initialValues = {
    domainName: '',
  };
  const {
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AddDomainModalFormValues>({
    defaultValues: initialValues,
    values: initialValues,
    resolver: zodResolver(editCategorySchema),
  });

  const getErrors = (field: keyof AddDomainModalFormValues) =>
    errors[field]?.message;

  const onSubmit = async (data: AddDomainModalFormValues) => {
    if (category.domains.includes(data.domainName)) {
      setError('domainName', {
        type: 'manual',
        message: 'Domain already exists in this category',
      });
      return;
    }
    await editCategory({
      ...category,
      domains: [...category.domains, data.domainName],
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AddDomainModalUI
        isOpen={isOpen}
        onClose={onClose}
        formValues={watch()}
        onChange={(f, v) => setValue(f, v, { shouldValidate: true })}
        getErrors={getErrors}
      />
    </form>
  );
};

export default AddDomainModal;
