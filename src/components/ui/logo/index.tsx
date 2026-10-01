import React from 'react';
import styled from 'styled-components';
const LogoContainer = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.color['Attention/Attention 40']};
  border-radius: 24px;
  margin-right: 16px;
`;
export const Logo: React.FC = () => <LogoContainer />;
