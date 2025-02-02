export interface BaseSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

interface SelectOption {
  value: string;
  label: string;
}

const BaseSelect = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  disabled = false,
}: BaseSelectProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      {label && (
        <label className="label text-base font-semibold">{label}</label>
      )}
      <select
        className="select select-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BaseSelect;
