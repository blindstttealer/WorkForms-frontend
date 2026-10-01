import styled from 'styled-components';
export const PlaceholderWrap = styled.div`
  position: relative;
`;
export const PlaceholderHitArea = styled.button`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 30']};
  cursor: text;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.color['Neutral/Neutral 50']};
    background: ${({ theme }) => theme.color['Primary/Primary 10']};
  }

  &:empty::before {
    content: 'Добавить placeholder…';
  }
`;
export const PlaceholderEditor = styled.input`
  position: absolute;
  inset: 0;
  z-index: 3;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.color['Primary/Primary 40']};
  border-radius: 8px;
  background: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  outline: none;
  box-shadow: 0 0 0 3px ${({ theme }) => theme.color['Primary/Primary 20']};
`;
