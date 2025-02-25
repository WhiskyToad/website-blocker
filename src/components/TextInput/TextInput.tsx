import type React from 'react';

export interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  label: string;
  error?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
}

const TextInput = ({
  placeholder,
  value,
  onChange,
  required = false,
  label,
  error,
  type = 'text',
}: TextInputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="flex flex-col">
        <span>
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className={`input input-bordered w-full max-w-xs ${
            error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
          }`}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
