import { forwardRef } from 'react';
import { NumberInputField } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export interface FormNumberInputProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minValue?: number;
  maxValue?: number;
  precision?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
}
export const FormNumberInput = forwardRef<HTMLInputElement, FormNumberInputProps>(
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
      minValue,
      maxValue,
      precision = 0,
      step,
      suffix,
      prefix,
      className,
    },
    ref,
  ) => (
    <NumberInputField
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
      minValue={minValue}
      maxValue={maxValue}
      precision={precision}
      step={step}
      suffix={suffix}
      prefix={prefix}
      className={className}
    />
  ),
);
FormNumberInput.displayName = 'FormNumberInput';
