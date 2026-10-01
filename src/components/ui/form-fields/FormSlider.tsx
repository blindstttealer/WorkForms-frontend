import { forwardRef, useCallback } from 'react';
import { SliderInputField } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export interface FormSliderProps extends BaseFieldProps {
  value: number;
  onChange: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  precision?: number;
  suffix?: string;
  prefix?: string;
  placeholder?: string;
}
export const FormSlider = forwardRef<HTMLInputElement, FormSliderProps>(
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
      minValue = 0,
      maxValue = 100,
      step,
      precision = 0,
      suffix,
      prefix,
      placeholder,
      className,
    },
    ref,
  ) => {
    const handleChange = useCallback(
      (_fullStr: string, shortStr: string) => {
        const parsed = Number(shortStr.replace(/\s/g, '').replace(',', '.'));
        onChange(isNaN(parsed) ? minValue : parsed);
      },
      [onChange, minValue],
    );
    return (
      <SliderInputField
        ref={ref}
        label={label}
        value={String(value)}
        onChange={handleChange}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        precision={precision}
        suffix={suffix}
        prefix={prefix}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        status={status}
        extraText={extraText}
        className={className}
      />
    );
  },
);
FormSlider.displayName = 'FormSlider';
