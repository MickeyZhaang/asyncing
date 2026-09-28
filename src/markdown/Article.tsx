import type { ReactNode } from 'react';
import { styled } from '@asyncing/styled';

const Container = styled.article`
  font-size: 1.24rem;
  line-height: 1.6;
  max-width: 42rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: 1.15rem;
  }
`;

export function Article({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}
