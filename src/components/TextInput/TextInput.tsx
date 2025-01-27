export interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const TextInput = ({
  placeholder,
  value,
  onChange,
  required = false,
}: TextInputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-full max-w-xs"
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
