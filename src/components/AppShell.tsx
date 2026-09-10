import type { ReactNode } from 'react';
import { styled } from '../theme';

const Shell = styled.div`
  display: grid;
  grid-template-columns: 18rem minmax(0, 1fr);
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoint.sidebar}) {
    display: block;
  }
`;

export function AppShell({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>;
}
