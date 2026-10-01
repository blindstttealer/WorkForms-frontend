import { CheckboxProps as AntCheckboxProps } from 'antd';
import React from 'react';
export interface CheckboxProps extends AntCheckboxProps {
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  label?: React.ReactNode;
  containerStyle?: React.CSSProperties;
}
