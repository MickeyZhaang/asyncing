import { describe, expect, it } from 'vitest';
import { isList, parseList } from './parse';

describe('isList', () => {
  it.each(['- Item', '* Item', '+ Item', '1. Item', '42. Item'])(
    'recognizes %s',
    (line) => {
      expect(isList(line)).toBe(true);
    },
  );

  it.each(['-Item', '1.Item', '1) Item', '  - Item', '-', 'Paragraph'])(
    'rejects %s',
    (line) => {
      expect(isList(line)).toBe(false);
    },
  );
});

describe('parseList', () => {
  it('parses consecutive unordered items', () => {
    const result = parseList(['- First', '* Second', '+ Third'], 0);

    expect(result).toEqual({
      block: {
        type: 'list',
        ordered: false,
        items: ['First', 'Second', 'Third'],
      },
      nextIndex: 3,
    });
  });

  it('parses ordered items without enforcing their sequence', () => {
    const result = parseList(['4. First', '10. Second'], 0);

    expect(result).toEqual({
      block: {
        type: 'list',
        ordered: true,
        items: ['First', 'Second'],
      },
      nextIndex: 2,
    });
  });

  it('stops when the list type changes', () => {
    const result = parseList(['- First', '1. Second'], 0);

    expect(result).toEqual({
      block: {
        type: 'list',
        ordered: false,
        items: ['First'],
      },
      nextIndex: 1,
    });
  });
});
