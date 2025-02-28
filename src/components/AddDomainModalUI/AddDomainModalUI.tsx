import { useFocusOnOpen } from '@/utils/useFocusOnOpen';
import BaseModal from '../BaseModal/BaseModal';
import TextInput from '../TextInput/TextInput';

export interface AddDomainModalFormValues {
  domainName: string;
}

export interface AddDomainModalUIProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (field: keyof AddDomainModalFormValues, value: string) => void;
  getErrors: (field: keyof AddDomainModalFormValues) => string | undefined;
  formValues: AddDomainModalFormValues;
}

const AddDomainModalUI = ({
  isOpen,
  onClose,
  onChange,
  getErrors,
  formValues,
}: AddDomainModalUIProps) => {
  const ref = useFocusOnOpen<HTMLInputElement>(isOpen);
  return (
    <BaseModal
      title="Add Domain"
      isOpen={isOpen}
      onClose={onClose}
      submitText={'Submit'}
      submitButtonType="submit"
    >
      <div className="space-y-4">
        <TextInput
          placeholder="Add a domain in form of example.com"
          value={formValues.domainName}
          onChange={(value) => onChange('domainName', value)}
          required
          label="Domain"
          error={getErrors('domainName')}
          ref={ref}
        />
      </div>
    </BaseModal>
  );
};

export default AddDomainModalUI;
