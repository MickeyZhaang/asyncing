import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap');
  :root { background: ${({ theme }) => theme.color.background}; color: ${({ theme }) => theme.color.ink}; font-family: ${({ theme }) => theme.font.body}; font-synthesis: none; }
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { color: inherit; font: inherit; }
`
