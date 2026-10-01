import { forwardRef } from 'react';
import { FileInputField } from '@admiral-ds/react-ui';
import type { BaseFieldProps } from './types';
export interface FormFileInputProps extends BaseFieldProps {
  onChange: (files: File[]) => void;
  title?: string;
  accept?: string;
  multiple?: boolean;
  dimension?: 'xl' | 'm';
}
export const FormFileInput = forwardRef<HTMLInputElement, FormFileInputProps>(
  (
    {
      onChange,
      label,
      required,
      disabled,
      status,
      extraText,
      title = 'Перетащите файл сюда или нажмите для выбора',
      accept,
      multiple,
      dimension = 'm',
      className,
    },
    ref,
  ) => (
    <FileInputField
      ref={ref}
      label={label}
      dimension={dimension}
      title={title}
      accept={accept}
      multiple={multiple}
      onChange={(e) => {
        const files = (e.target as HTMLInputElement).files;
        onChange(files ? Array.from(files) : []);
      }}
      required={required}
      disabled={disabled}
      status={status}
      extraText={extraText}
      className={className}
    />
  ),
);
FormFileInput.displayName = 'FormFileInput';
