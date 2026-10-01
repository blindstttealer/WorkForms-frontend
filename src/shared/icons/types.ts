import type { ComponentType } from 'react';
export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'time'
  | 'slider'
  | 'switch'
  | 'file'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'heading'
  | 'paragraph'
  | 'divider';
export type FormFieldPaletteCategory = 'input' | 'choice' | 'layout' | 'media';
export type IconComponent = ComponentType<{
  width?: number;
  height?: number;
  className?: string;
}>;
