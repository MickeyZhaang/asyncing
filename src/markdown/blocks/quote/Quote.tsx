import type { ReactNode } from 'react';
import { styled } from '@asyncing/styled';

const Element = styled.blockquote`
  border-left: 2px solid ${({ theme }) => theme.color.quote};
  color: ${({ theme }) => theme.color.muted};
  margin: 1.8rem 0;
  padding-left: 1.4rem;
`;
export function Quote({ children }: { children: ReactNode }) {
  return <Element>{children}</Element>;
}
