import type { ReactNode } from 'react';
export interface BuilderInlinePlaceholderProps {
  placeholder?: string;
  onChange: (value: string) => void;
  children: ReactNode;
}
