import type { ParsedBlock } from '../types';

export function parseParagraph(
  lines: string[],
  index: number,
  isBlockStart: (line: string) => boolean,
): ParsedBlock {
  const paragraph: string[] = [];
  let nextIndex = index;
  while (
    nextIndex < lines.length &&
    lines[nextIndex].trim() &&
    !isBlockStart(lines[nextIndex])
  )
    paragraph.push(lines[nextIndex++]);
  return {
    block: { type: 'paragraph', value: paragraph.join(' ') },
    nextIndex,
  };
}
