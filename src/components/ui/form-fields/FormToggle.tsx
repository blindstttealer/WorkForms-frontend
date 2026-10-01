import { forwardRef } from 'react';
import { Toggle } from '@admiral-ds/react-ui';
import styled from 'styled-components';
export interface FormToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  extraText?: React.ReactNode;
  error?: boolean;
  className?: string;
}
export const FormToggle = forwardRef<HTMLInputElement, FormToggleProps>(
  (
    { checked, onChange, label, required, disabled, readOnly, extraText, error, className },
    ref,
  ) => (
    <Container className={className}>
      <ToggleRow>
        <Toggle
          ref={ref}
          checked={checked}
          onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
          disabled={disabled}
          readOnly={readOnly}
        />
        {label && (
          <ToggleLabel>
            {label}
            {required && <Required> *</Required>}
          </ToggleLabel>
        )}
      </ToggleRow>
      {extraText && <HintText $error={error}>{extraText}</HintText>}
    </Container>
  ),
);
FormToggle.displayName = 'FormToggle';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const ToggleLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
const Required = styled.span`
  color: ${({ theme }) => theme.color['Error/Error 60 Main']};
`;
const HintText = styled.span<{
  $error?: boolean;
}>`
  font-size: 12px;
  color: ${({ theme, $error }) =>
    $error ? theme.color['Error/Error 60 Main'] : theme.color['Neutral/Neutral 50']};
`;
