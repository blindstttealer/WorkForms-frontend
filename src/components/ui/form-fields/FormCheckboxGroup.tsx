import { useCallback } from 'react';
import { CheckboxField } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import type { BaseFieldProps } from './types';
export type CheckboxOption = {
  label: string;
  value: string;
};
export interface FormCheckboxGroupProps extends Omit<BaseFieldProps, 'status'> {
  value: string[];
  onChange: (values: string[]) => void;
  options: CheckboxOption[];
  error?: boolean;
}
export const FormCheckboxGroup = ({
  value,
  onChange,
  options,
  label,
  required,
  disabled,
  readOnly,
  error,
  extraText,
  className,
}: FormCheckboxGroupProps) => {
  const handleToggle = useCallback(
    (optValue: string, checked: boolean) => {
      onChange(checked ? [...value, optValue] : value.filter((v) => v !== optValue));
    },
    [value, onChange],
  );
  return (
    <Container className={className}>
      {label && (
        <GroupLabel>
          {label}
          {required && <Required> *</Required>}
        </GroupLabel>
      )}
      <OptionsWrap>
        {options.map((opt) => (
          <CheckboxField
            key={opt.value}
            checked={value.includes(opt.value)}
            onChange={(e) => handleToggle(opt.value, (e.target as HTMLInputElement).checked)}
            disabled={disabled}
            readOnly={readOnly}
            error={error}
          >
            {opt.label}
          </CheckboxField>
        ))}
      </OptionsWrap>
      {extraText && <HintText $error={error}>{extraText}</HintText>}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const GroupLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
const Required = styled.span`
  color: ${({ theme }) => theme.color['Error/Error 60 Main']};
`;
const OptionsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
`;
const HintText = styled.span<{
  $error?: boolean;
}>`
  font-size: 12px;
  color: ${({ theme, $error }) =>
    $error ? theme.color['Error/Error 60 Main'] : theme.color['Neutral/Neutral 50']};
`;
