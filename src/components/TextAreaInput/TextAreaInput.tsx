export interface TextAreaInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  label: string;
  error?: string;
}

const TextAreaInput = ({
  placeholder,
  value,
  onChange,
  required = false,
  label,
  error,
}: TextAreaInputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="flex flex-col">
        <span>
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        <textarea
          className={`textarea textarea-bordered w-full max-w-xs resize-none focus:ring-2 focus:outline-none p-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
          }`}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextAreaInput;
