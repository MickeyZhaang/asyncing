import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root { background: ${({ theme }) => theme.color.background}; color: ${({ theme }) => theme.color.ink}; font-family: ${({ theme }) => theme.font.body}; font-synthesis: none; }
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { color: inherit; font: inherit; }
`;
