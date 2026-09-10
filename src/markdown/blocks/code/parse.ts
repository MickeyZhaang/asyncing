import type { ParsedBlock } from '../types';

export function isCodeStart(line: string) {
  return /^```([^`]*)$/.test(line);
}

export function parseCode(lines: string[], index: number): ParsedBlock {
  const language = lines[index].match(/^```([^`]*)$/)?.[1].trim() ?? '';
  const code: string[] = [];
  let nextIndex = index + 1;
  while (nextIndex < lines.length && !lines[nextIndex].startsWith('```'))
    code.push(lines[nextIndex++]);
  if (nextIndex < lines.length) nextIndex += 1;
  return {
    block: { type: 'code', language, value: code.join('\n') },
    nextIndex,
  };
}
