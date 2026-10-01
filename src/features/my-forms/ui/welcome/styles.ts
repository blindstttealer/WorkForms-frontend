import styled from 'styled-components';
export const Wrapper = styled.div`
  padding: 24px 32px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 768px;
  margin: 32px auto;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.color['Primary/Primary 60']};
  }
`;
export const Title = styled.h2`
  margin-bottom: 16px;
  text-align: center;
  color: ${({ theme }) => theme.color['Primary/Primary 60']};
  ${({ theme }) => theme.typography['Header/H4']};
`;
export const StyledButton = styled.button<{
  hasFormId?: boolean;
}>`
  cursor: pointer;
  background-color: ${({ theme, hasFormId }) =>
    hasFormId ? theme.color['Attention/Attention 70'] : theme.color['Success/Success 70']};
  color: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  padding: 16px 24px;
  border-radius: 16px;
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  margin-top: 20px;
  ${({ theme }) => theme.typography['Header/H5']};

  &:hover {
    background-color: ${({ theme, hasFormId }) =>
      hasFormId ? theme.color['Attention/Attention 80'] : theme.color['Success/Success 80']};
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${({ theme, hasFormId }) =>
      hasFormId ? theme.color['Attention/Attention 90'] : theme.color['Success/Success 90']};
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, hasFormId }) =>
        hasFormId ? theme.color['Attention/Attention 60'] : theme.color['Success/Success 60']};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
export const CompanyInfo = styled.p`
  margin-top: 24px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 70']};
  text-align: center;
  user-select: none;
  ${({ theme }) => theme.typography['Body/Body 1 Long']};
`;
