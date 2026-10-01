import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--admiral-font-family, ${({ theme }) => theme.fontFamily});
    color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
    background-color: ${({ theme }) => theme.color['Background/Background 1']};
    transition: background-color 0.3s ease, color 0.3s ease;
    ${({ theme }) => theme.typography['Body/Body 1 Long']};
  }

  a {
    color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.color['Neutral/Neutral 70']};
    }
  }

  ul, ol {
    list-style: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: transparent;
  }

  input, textarea, select {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .ant-layout {
    background: ${({ theme }) => theme.color['Background/Background 1']};
  }

  .ant-btn-primary {
    background: ${({ theme }) => theme.color['Primary/Primary 60']};
    
    &:hover {
      background: ${({ theme }) => theme.color['Primary/Primary 70']};
    }
    
    &:active {
      background: ${({ theme }) => theme.color['Primary/Primary 80']};
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
