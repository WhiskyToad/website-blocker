import BaseModal from '../BaseModal/BaseModal';
import TextInput from '../TextInput/TextInput';

export interface TemporarilyAllowModalFormValues {
  minutes: string;
  customMinutes: string;
}

export interface TemporarilyAllowModalUiProps {
  siteName: string;
  isOpen: boolean;
  onClose: () => void;
  onChange: (
    field: keyof TemporarilyAllowModalFormValues,
    value: string
  ) => void;
  getErrors: (
    field: keyof TemporarilyAllowModalFormValues
  ) => string | undefined;
  formValues: TemporarilyAllowModalFormValues;
}

const TemporarilyAllowModalUi = ({
  isOpen,
  onClose,
  onChange,
  getErrors,
  formValues,
  siteName,
}: TemporarilyAllowModalUiProps) => {
  const timeOptions = [5, 15, 30, 60];

  return (
    <BaseModal
      title="Temporarily Allow Site"
      isOpen={isOpen}
      onClose={onClose}
      submitText="Allow"
      submitButtonType="submit"
    >
      <div className="space-y-4">
        <p>
          How long would you like to unblock <strong>{siteName}</strong>?
        </p>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Duration (minutes)</label>
          <div className="flex gap-2 flex-wrap">
            {timeOptions.map((minutes) => (
              <button
                key={minutes}
                onClick={() => onChange('minutes', minutes.toString())}
                className={`px-4 py-2 rounded ${
                  formValues.minutes === minutes.toString()
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {minutes}
              </button>
            ))}
            <TextInput
              type="number"
              placeholder="Custom"
              value={formValues.customMinutes}
              onChange={(value) => onChange('customMinutes', value)}
              label="Custom time"
            />
          </div>
          {getErrors('minutes') && (
            <span className="text-red-500 text-sm">{getErrors('minutes')}</span>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default TemporarilyAllowModalUi;
