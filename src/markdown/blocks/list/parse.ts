import type { ParsedBlock } from '../types';

export function isList(line: string) {
  return /^(?:[-*+] |\d+\. )(.+)$/.test(line);
}
export function parseList(lines: string[], index: number): ParsedBlock {
  const ordered = /^\d+\. /.test(lines[index]);
  const pattern = ordered ? /^\d+\. (.+)$/ : /^[-*+] (.+)$/;
  const items: string[] = [];
  let nextIndex = index;
  while (nextIndex < lines.length) {
    const item = lines[nextIndex].match(pattern);
    if (!item) break;
    items.push(item[1]);
    nextIndex += 1;
  }
  return { block: { type: 'list', ordered, items }, nextIndex };
}
