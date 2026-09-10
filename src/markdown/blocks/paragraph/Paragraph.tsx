import type { ReactNode } from 'react';
import { styled } from '../../../theme';

const Element = styled.p`
  margin: 0 0 1.25rem;
`;
export function Paragraph({ children }: { children: ReactNode }) {
  return <Element>{children}</Element>;
}
