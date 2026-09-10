export type Block =
  | { type: 'code'; language: string; value: string }
  | { type: 'heading'; depth: number; value: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; value: string }
  | { type: 'rule' }
  | { type: 'paragraph'; value: string };

export type BlockKind = Block['type'];
export type ParsedBlock = { block: Block; nextIndex: number };
