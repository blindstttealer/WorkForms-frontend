export type FieldStatus = 'error' | 'success';
export interface BaseFieldProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  status?: FieldStatus;
  extraText?: React.ReactNode;
  className?: string;
}
