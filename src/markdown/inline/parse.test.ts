import { describe, expect, it } from 'vitest';
import { parseInline } from './parse';

describe('parseInline', () => {
  it('returns plain text as a text token', () => {
    const res = parseInline('Hello world');

    expect(res).toEqual([
      {
        type: 'text',
        value: 'Hello world',
      },
    ]);
  });

  it('parses strong text', () => {
    const res = parseInline('this is **important**.');

    expect(res).toEqual([
      {
        type: 'text',
        value: 'this is ',
      },
      {
        type: 'strong',
        value: 'important',
      },
      {
        type: 'text',
        value: '.',
      },
    ]);
  });

  it('parses emphasis text', () => {
    const res = parseInline('*emphasized*');

    expect(res).toEqual([
      {
        type: 'emphasis',
        value: 'emphasized',
      },
    ]);
  });

  it('parses code text', () => {
    const res = parseInline('`code block`');
    expect(res).toEqual([{ type: 'code', value: 'code block' }]);
  });

  it('preserves * inside lines', () => {
    const res = parseInline('coding*now');

    expect(res).toEqual([
      {
        type: 'text',
        value: 'coding*now',
      },
    ]);
  });

  it('parses links properly', () => {
    const res = parseInline('[example](https://example.com)');
    expect(res).toEqual([
      {
        type: 'link',
        label: 'example',
        href: 'https://example.com',
      },
    ]);
  });
});
