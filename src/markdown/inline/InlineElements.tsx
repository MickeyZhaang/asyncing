import { styled } from '../../theme';

export const InlineCode = styled.code`
  background: ${({ theme }) => theme.color.inlineCode};
  border-radius: 0.2rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.76em;
  padding: 0.14em 0.3em;
`;
export const Link = styled.a`
  color: ${({ theme }) => theme.color.link};
  text-decoration-thickness: 1px;
  text-underline-offset: 0.16em;
`;

export const Arrow = styled.span`
  display: inline-block;
  transform: translateY(0.08em);
`;
