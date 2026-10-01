import { forwardRef } from 'react';
import { TimeField } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export interface FormTimeInputProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  startTime?: string;
  endTime?: string;
}
export const FormTimeInput = forwardRef<HTMLInputElement, FormTimeInputProps>(
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
      startTime,
      endTime,
      className,
    },
    ref,
  ) => (
    <TimeField
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
      startTime={startTime}
      endTime={endTime}
      className={className}
    />
  ),
);
FormTimeInput.displayName = 'FormTimeInput';
