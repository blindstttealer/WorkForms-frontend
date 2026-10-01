import React from 'react';
import { CheckboxProps } from './types';
import { StyledCheckboxContainer, StyledCheckbox, HelperText, ErrorText } from './styles';
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  helperText,
  error = false,
  errorMessage,
  containerStyle,
  className,
  ...props
}) => {
  return (
    <StyledCheckboxContainer direction="vertical" size={4} style={containerStyle}>
      <StyledCheckbox className={className} $error={error} {...props}>
        {label}
      </StyledCheckbox>

      {helperText && !error && <HelperText type="secondary">{helperText}</HelperText>}

      {error && errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </StyledCheckboxContainer>
  );
};
