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

  it('parses blockquotes', () => {
    const res = parseBlocks('> A quote.');
    expect(res).toEqual([
      {
        type: 'quote',
        value: 'A quote.',
      },
    ]);
  });

  it.each([
    ['---', { type: 'rule' }],
    ['***', { type: 'rule' }],
    ['___', { type: 'rule' }],
    ['--', { type: 'paragraph', value: '--' }],
  ])('classifies %s', (source, expected) => {
    expect(parseBlocks(source)).toEqual([expected]);
  });

  it('parses ordered and unordered lists', () => {
    const source = ['- First', '- Second', '', '1. Third', '2. Fourth'].join(
      '\n',
    );

    expect(parseBlocks(source)).toEqual([
      {
        type: 'list',
        ordered: false,
        items: ['First', 'Second'],
      },
      {
        type: 'list',
        ordered: true,
        items: ['Third', 'Fourth'],
      },
    ]);
  });

  it('preserves Markdown syntax inside code blocks', () => {
    const source = ['```md', '# Not a heading', '- Not a list', '```'].join(
      '\n',
    );

    expect(parseBlocks(source)).toEqual([
      {
        type: 'code',
        language: 'md',
        value: '# Not a heading\n- Not a list',
      },
    ]);
  });

  it('ignores blank lines', () => {
    expect(parseBlocks('\n\n# Title\n\n')).toEqual([
      {
        type: 'heading',
        depth: 1,
        value: 'Title',
      },
    ]);
  });

  it('returns no blocks for blank input', () => {
    expect(parseBlocks('\n\n')).toEqual([]);
  });

  it('normalizes Windows line endings', () => {
    expect(parseBlocks('# Title\r\n\r\nParagraph.')).toEqual([
      {
        type: 'heading',
        depth: 1,
        value: 'Title',
      },
      {
        type: 'paragraph',
        value: 'Paragraph.',
      },
    ]);
  });
});
