import { HEADER_HEIGHT } from '@/shared/const';
import styled from 'styled-components';
export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  height: ${HEADER_HEIGHT}px;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  background-color: ${({ theme }) => theme.color['Neutral/Neutral 10']};
  border-bottom: 1px solid ${({ theme }) => theme.color['Neutral/Neutral 20']};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* ← важно */
`;
export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
`;
export const Title = styled.h1`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.color['Neutral/Neutral 10']};
`;
