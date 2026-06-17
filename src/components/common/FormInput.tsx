import { type Control, type FieldPath, type FieldValues, useController } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  isSensitive?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  isRequired = false,
  isSensitive = false,
  disabled = false,
  className = '',
}: FormInputProps<T>) {
  const { field, fieldState } = useController({ control, name });

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        {...field}
        id={name}
        type={isSensitive ? 'password' : type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={isSensitive ? 'off' : undefined}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
      />
      {fieldState.error && (
        <span className="text-xs text-red-500" role="alert">
          {fieldState.error.message}
        </span>
      )}
    </div>
  );
}
