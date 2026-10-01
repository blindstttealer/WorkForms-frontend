import { forwardRef } from 'react';
import { InputField } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export interface FormInputProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'url' | 'tel';
  placeholder?: string;
  maxLength?: number;
}
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      value,
      onChange,
      type = 'text',
      label,
      placeholder,
      required,
      disabled,
      readOnly,
      status,
      extraText,
      maxLength,
      className,
    },
    ref,
  ) => (
    <InputField
      ref={ref}
      type={type}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      status={status}
      extraText={extraText}
      maxLength={maxLength}
      className={className}
    />
  ),
);
FormInput.displayName = 'FormInput';
