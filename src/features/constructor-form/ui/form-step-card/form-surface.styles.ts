import styled from 'styled-components';
export const FormSurfaceShell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 40px 24px;
  box-sizing: border-box;
`;
export const FormSurfaceCard = styled.div`
  padding: 28px;
  border-radius: 20px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 10']};
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
`;
