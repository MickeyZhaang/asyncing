import type { ParsedBlock } from '../types';

export function isHeading(line: string) {
  return /^(#{1,6})\s+(.+)$/.test(line);
}
export function parseHeading(line: string, index: number): ParsedBlock {
  const match = line.match(/^(#{1,6})\s+(.+)$/);
  return {
    block: {
      type: 'heading',
      depth: match?.[1].length ?? 1,
      value: match?.[2] ?? '',
    },
    nextIndex: index + 1,
  };
}
