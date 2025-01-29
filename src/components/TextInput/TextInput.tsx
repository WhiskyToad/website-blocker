export interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  label: string;
}

const TextInput = ({
  placeholder,
  value,
  onChange,
  required = false,
  label,
}: TextInputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="flex flex-col">
        <span className="label-text text-sm font-medium mb-1">{label}</span>
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default TextInput;
