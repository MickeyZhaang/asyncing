import type { ParsedBlock } from '../types';

export function isRule(line: string) {
  return /^([-*_])\1\1+\s*$/.test(line);
}
export function parseRule(index: number): ParsedBlock {
  return { block: { type: 'rule' }, nextIndex: index + 1 };
}
