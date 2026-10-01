import { forwardRef } from 'react';
import { TextField } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export interface FormTextAreaProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}
export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
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
      maxLength,
      className,
    },
    ref,
  ) => (
    <TextField
      ref={ref}
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
FormTextArea.displayName = 'FormTextArea';
