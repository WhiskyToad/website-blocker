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

const domainRegex =
  /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~%!$&'()*+,;=:@/]*)?$/;
const addDomainValidation = z.object({
  domainName: z
    .string()
    .min(1, 'Domain name is required')
    .regex(domainRegex, 'Invalid domain format (e.g., example.com)'),
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
    resolver: zodResolver(addDomainValidation),
  });

  const getErrors = (field: keyof AddDomainModalFormValues) =>
    errors[field]?.message;

  const cleanDomainInput = (input: string) => {
    return input.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
  };
  const onSubmit = async (data: AddDomainModalFormValues) => {
    const cleanDomain = cleanDomainInput(data.domainName);
    if (category.domains.includes(cleanDomain)) {
      setError('domainName', {
        type: 'manual',
        message: 'Domain already exists in this category',
      });
      return;
    }
    await editCategory({
      ...category,
      domains: [...category.domains, cleanDomain],
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
