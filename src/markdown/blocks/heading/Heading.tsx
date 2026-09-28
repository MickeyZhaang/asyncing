import type { ReactNode } from 'react';
import { styled } from '@asyncing/styled';

const Element = styled.h1`
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 1.06;
  margin: 1.75em 0 0.35em;
  &[data-depth='1'] {
    font-size: clamp(3.1rem, 7vw, 5.4rem);
    margin-top: 0;
  }
  &[data-depth='2'] {
    font-size: 2.25rem;
  }
  &[data-depth='3'] {
    font-size: 1.55rem;
  }
`;

export function Heading({
  children,
  depth,
}: {
  children: ReactNode;
  depth: number;
}) {
  return (
    <Element as={`h${depth}`} data-depth={depth}>
      {children}
    </Element>
  );
}
