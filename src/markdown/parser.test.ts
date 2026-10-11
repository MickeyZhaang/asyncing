import { describe, expect, it } from 'vitest';
import { parseBlocks } from './parser';

describe('parseBlocks', () => {
  it('parses headings and paragraphs', () => {
    const source = '# Title\n\nA paragraph.';

    expect(parseBlocks(source)).toEqual([
      {
        type: 'heading',
        depth: 1,
        value: 'Title',
      },
      {
        type: 'paragraph',
        value: 'A paragraph.',
      },
    ]);
  });

  it('quotes', () => {
    const res = parseBlocks('> A quote.');
    expect(res).toEqual([
      {
        type: 'quote',
        value: 'A quote.',
      },
    ]);
  });

  
});
