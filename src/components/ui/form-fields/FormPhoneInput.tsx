import { forwardRef } from 'react';
import { PhoneInputField } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export interface FormPhoneInputProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: string;
}
export const FormPhoneInput = forwardRef<HTMLInputElement, FormPhoneInputProps>(
  (
    {
      value,
      onChange,
      label,
      required,
      disabled,
      readOnly,
      status,
      extraText,
      defaultCountry = 'RUS',
      className,
    },
    ref,
  ) => (
    <PhoneInputField
      ref={ref}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      defaultCountry={defaultCountry}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      status={status}
      extraText={extraText}
      className={className}
    />
  ),
);
FormPhoneInput.displayName = 'FormPhoneInput';
