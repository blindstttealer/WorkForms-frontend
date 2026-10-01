import { forwardRef } from 'react';
import { DateField } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export interface FormDateInputProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'date' | 'date-range';
  placeholder?: string;
}
export const FormDateInput = forwardRef<HTMLInputElement, FormDateInputProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      required,
      disabled,
      readOnly,
      status,
      extraText,
      type = 'date',
      className,
    },
    ref,
  ) => (
    <DateField
      ref={ref}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      status={status}
      extraText={extraText}
      className={className}
    />
  ),
);
FormDateInput.displayName = 'FormDateInput';
