export interface TextAreaInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  label: string;
}

const TextAreaInput = ({
  placeholder,
  value,
  onChange,
  required = false,
  label,
}: TextAreaInputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="flex flex-col">
        <span className="label-text text-sm font-medium mb-1">{label}</span>
        <textarea
          className="textarea textarea-bordered w-full max-w-xs resize-none focus:ring-2 focus:ring-primary focus:outline-none p-2"
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default TextAreaInput;
