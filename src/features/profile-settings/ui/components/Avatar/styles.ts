import { styled } from 'styled-components';
export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 24px;
  padding: 20px 24px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 05']};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
`;
export const AvatarImage = styled.img`
  border-radius: 50%;
  width: 88px;
  height: 88px;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
`;
