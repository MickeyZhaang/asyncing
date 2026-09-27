export const theme = {
  color: {
    background: '#f8f6f1',
    border: '#d9d4ca',
    codeBackground: '#292824',
    codeText: '#f7f2e8',
    ink: '#3b3730',
    muted: '#746f65',
    mutedLight: '#8a857b',
    selected: '#e9e4da',
    link: '#7f3c24',
    quote: '#b76848',
    inlineCode: '#eae5da',
  },
  font: { body: "'Newsreader', Georgia, serif", mono: "'DM Mono', monospace" },
  breakpoint: { sidebar: '900px', mobile: '720px' },
} as const;

export type Theme = typeof theme;
