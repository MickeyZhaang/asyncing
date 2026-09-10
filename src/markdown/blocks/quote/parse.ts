import type { ParsedBlock } from '../types';

export function isQuote(line: string) {
  return line.startsWith('> ');
}
export function parseQuote(lines: string[], index: number): ParsedBlock {
  const quote: string[] = [];
  let nextIndex = index;
  while (nextIndex < lines.length && lines[nextIndex].startsWith('> '))
    quote.push(lines[nextIndex++].slice(2));
  return { block: { type: 'quote', value: quote.join(' ') }, nextIndex };
}
