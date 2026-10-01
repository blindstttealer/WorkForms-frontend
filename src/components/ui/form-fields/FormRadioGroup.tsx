import { useCallback } from 'react';
import { RadioButton } from '@admiral-ds/react-ui';
import styled from 'styled-components';
import type { BaseFieldProps } from './types';
export type RadioOption = {
  label: string;
  value: string;
};
export interface FormRadioGroupProps extends Omit<BaseFieldProps, 'status'> {
  value: string | null;
  onChange: (value: string) => void;
  options: RadioOption[];
  name: string;
  error?: boolean;
}
export const FormRadioGroup = ({
  value,
  onChange,
  options,
  name,
  label,
  required,
  disabled,
  readOnly,
  error,
  extraText,
  className,
}: FormRadioGroupProps) => {
  const handleChange = useCallback(
    (optValue: string) => () => {
      onChange(optValue);
    },
    [onChange],
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
          <RadioButton
            key={opt.value}
            name={name}
            checked={value === opt.value}
            onChange={handleChange(opt.value)}
            disabled={disabled}
            readOnly={readOnly}
            error={error}
          >
            {opt.label}
          </RadioButton>
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
