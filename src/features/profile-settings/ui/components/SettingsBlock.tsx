import styled from 'styled-components';
import { Card } from '../styles';
import type { SettingsBlockProps } from '../types';
export const SettingsBlock = ({ children, title, icon: Icon }: SettingsBlockProps) => {
  return (
    <SettingsBlockWrapper>
      <BlockHeader>
        {Icon && <Icon width={26} height={26} />}
        <Title>{title}</Title>
      </BlockHeader>
      {children}
    </SettingsBlockWrapper>
  );
};
const SettingsBlockWrapper = styled(Card).attrs({
  hoverable: false,
})`
  margin: 0;
`;
const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  margin-bottom: 24px;
`;
const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
