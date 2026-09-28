import type { ReactNode } from 'react';
import { styled } from '@asyncing/styled';

const Element = styled.ul`
  li {
    margin: 0.3rem 0;
    padding-left: 0.25rem;
  }
`;

export function List({
  children,
  ordered,
}: {
  children: ReactNode;
  ordered: boolean;
}) {
  return <Element as={ordered ? 'ol' : 'ul'}>{children}</Element>;
}
