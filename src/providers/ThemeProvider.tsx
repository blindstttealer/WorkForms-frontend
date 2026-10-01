import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { LIGHT_THEME, DARK_THEME, FontsVTBGroup, DropdownProvider } from '@admiral-ds/react-ui';
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});
export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('theme', theme.name);
  }, [theme.name]);
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        <DropdownProvider>
          <FontsVTBGroup />
          {children}
        </DropdownProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
