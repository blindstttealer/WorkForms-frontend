import type { ReactNode } from 'react';
export interface CollapsibleSectionProps {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}
export interface InspectorTextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}
export interface InspectorToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
export interface InspectorSelectProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  children: ReactNode;
}
