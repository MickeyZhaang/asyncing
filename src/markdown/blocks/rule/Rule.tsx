import { styled } from '@asyncing/styled';

const Element = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 3rem 0;
`;
export function Rule() {
  return <Element />;
}
