import { forwardRef, type ReactNode } from 'react';
import { SelectField, Option } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export type SelectOption = {
  label: string;
  value: string;
};
export interface FormSelectProps extends BaseFieldProps {
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  mode?: 'select' | 'searchSelect';
  renderCustomOption?: (option: SelectOption) => ReactNode;
}
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      value,
      onChange,
      options,
      label,
      placeholder,
      required,
      disabled,
      status,
      extraText,
      mode = 'select',
      className,
    },
    ref,
  ) => (
    <SelectField
      ref={ref}
      label={label}
      value={value || undefined}
      onSelectedChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      status={status}
      extraText={extraText}
      mode={mode}
      className={className}
    >
      {options.map((opt) => (
        <Option key={opt.value} value={opt.value}>
          {opt.label}
        </Option>
      ))}
    </SelectField>
  ),
);
FormSelect.displayName = 'FormSelect';
