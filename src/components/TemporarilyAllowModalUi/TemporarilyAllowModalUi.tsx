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
              <label key={minutes} className="label cursor-pointer">
                <input
                  type="radio"
                  name="minutes"
                  className="radio radio-primary"
                  checked={formValues.minutes === minutes.toString()}
                  onChange={() => onChange('minutes', minutes.toString())}
                />
                <span className="label-text ml-2">{minutes} minutes</span>
              </label>
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
