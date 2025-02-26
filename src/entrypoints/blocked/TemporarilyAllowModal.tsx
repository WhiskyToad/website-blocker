import { useForm } from 'react-hook-form';
import TemporarilyAllowModalUi, {
  type TemporarilyAllowModalFormValues,
} from '../../components/TemporarilyAllowModalUi/TemporarilyAllowModalUi';
import { saveTemporarilyAllowedSite } from '@/utils/temporarilyAllow';

interface TemporarilyAllowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemporarilyAllowModal = ({
  isOpen,
  onClose,
}: TemporarilyAllowModalProps) => {
  const searchParams = new URLSearchParams(location.search);
  const blockedSite = searchParams.get('blockedSite');
  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TemporarilyAllowModalFormValues>({
    defaultValues: {
      minutes: '',
      customMinutes: '',
    },
  });

  const handleValueChange = (
    field: keyof TemporarilyAllowModalFormValues,
    value: string
  ) => {
    // Reset the other field when one is changed
    if (field === 'minutes') {
      setValue('customMinutes', '');
    } else if (field === 'customMinutes') {
      setValue('minutes', '');
    }
    setValue(field, value);
  };

  const onFormSubmit = async (data: TemporarilyAllowModalFormValues) => {
    await saveTemporarilyAllowedSite(
      blockedSite ?? '',
      Number(data.minutes || data.customMinutes)
    );
    onClose();
    window.location.href = blockedSite ?? '';
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <TemporarilyAllowModalUi
        siteName={blockedSite ?? ''}
        isOpen={isOpen}
        onClose={onClose}
        onChange={handleValueChange}
        getErrors={(field) => errors[field]?.message}
        formValues={watch()}
      />
    </form>
  );
};
