import { isCodeStart, parseCode } from './blocks/code/parse';
import { isHeading, parseHeading } from './blocks/heading/parse';
import { isList, parseList } from './blocks/list/parse';
import { parseParagraph } from './blocks/paragraph/parse';
import { isQuote, parseQuote } from './blocks/quote/parse';
import { isRule, parseRule } from './blocks/rule/parse';
import type { Block, BlockKind, ParsedBlock } from './blocks/types';

function getBlockKind(line: string): BlockKind | null {
  if (isCodeStart(line)) return 'code';
  if (isHeading(line)) return 'heading';
  if (isRule(line)) return 'rule';
  if (isQuote(line)) return 'quote';
  if (isList(line)) return 'list';
  return line.trim() ? 'paragraph' : null;
}

function parseBlock(lines: string[], index: number): ParsedBlock {
  const kind = getBlockKind(lines[index]);
  switch (kind) {
    case 'code':
      return parseCode(lines, index);
    case 'heading':
      return parseHeading(lines[index], index);
    case 'rule':
      return parseRule(index);
    case 'quote':
      return parseQuote(lines, index);
    case 'list':
      return parseList(lines, index);
    case 'paragraph':
      return parseParagraph(
        lines,
        index,
        (line) => getBlockKind(line) !== 'paragraph',
      );
    default:
      return { block: { type: 'paragraph', value: '' }, nextIndex: index + 1 };
  }
}

export function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    if (!lines[index].trim()) {
      index += 1;
      continue;
    }
    const { block, nextIndex } = parseBlock(lines, index);
    blocks.push(block);
    index = nextIndex;
  }

  return blocks;
}
