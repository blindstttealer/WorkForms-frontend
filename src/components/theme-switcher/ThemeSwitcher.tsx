import React from 'react';
import { Toggle } from '@admiral-ds/react-ui';
import styled from 'styled-components';
const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  width: 100%;
`;
const ToggleLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;
interface ThemeToggleProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => (
  <ToggleRow>
    <ToggleLabel>Тёмная тема</ToggleLabel>
    <Toggle checked={!!isDarkMode} onChange={() => toggleTheme?.()} dimension="s" />
  </ToggleRow>
);
