import { forwardRef } from 'react';
import { CheckboxField } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export interface FormCheckboxProps extends Omit<BaseFieldProps, 'status'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
  children?: React.ReactNode;
}
export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ checked, onChange, disabled, readOnly, error, extraText, children, className }, ref) => (
    <CheckboxField
      ref={ref}
      checked={checked}
      onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      extraText={extraText}
      className={className}
    >
      {children}
    </CheckboxField>
  ),
);
FormCheckbox.displayName = 'FormCheckbox';
