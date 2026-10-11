export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'emphasis'; value: string }
  | { type: 'code'; value: string }
  | { type: 'link'; label: string; href: string };

export function parseInline(value: string): InlineToken[] {
  const pattern =
    /(\*\*[^*]+\*\*|\*[^*]+\*|(?<![\w_])_[^_]+_(?![\w_])|`[^`]+`|\[[^\]]+\]\([^\s)]+\))/g;

  const pieces: string[] = value.split(pattern).filter(Boolean);

  return pieces.map((piece): InlineToken => {
    if (piece.startsWith('**')) {
      return {
        type: 'strong',
        value: piece.slice(2, -2),
      };
    }

    if (piece.startsWith('*')) {
      return {
        type: 'emphasis',
        value: piece.slice(1, -1),
      };
    }

    if (piece.startsWith('`')) {
      return {
        type: 'code',
        value: piece.slice(1, -1),
      };
    }

    const link = piece.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);

    if (link) {
      return {
        type: 'link',
        label: link[1],
        href: link[2],
      };
    }

    return {
      type: 'text',
      value: piece,
    };
  });
}
