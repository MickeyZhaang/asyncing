import { styled } from '../../theme'

export const Article = styled.article`
  font-size: 1.24rem;
  line-height: 1.6;
  max-width: 42rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) { font-size: 1.15rem; }
`
export const Heading = styled.h1`
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 1.06;
  margin: 2.5em 0 0.65em;
  &[data-depth='1'] { font-size: clamp(3.1rem, 7vw, 5.4rem); margin-top: 0; }
  &[data-depth='2'] { font-size: 2.25rem; }
  &[data-depth='3'] { font-size: 1.55rem; }
`
export const Paragraph = styled.p`margin: 0 0 1.25rem;`
export const Link = styled.a`color: ${({ theme }) => theme.color.link}; text-decoration-thickness: 1px; text-underline-offset: 0.16em;`
export const InlineCode = styled.code`background: ${({ theme }) => theme.color.inlineCode}; border-radius: 0.2rem; font-family: ${({ theme }) => theme.font.mono}; font-size: 0.76em; padding: 0.14em 0.3em;`
export const Quote = styled.blockquote`border-left: 2px solid ${({ theme }) => theme.color.quote}; color: ${({ theme }) => theme.color.muted}; margin: 1.8rem 0; padding-left: 1.4rem;`
export const Rule = styled.hr`border: 0; border-top: 1px solid ${({ theme }) => theme.color.border}; margin: 3rem 0;`
export const List = styled.ul`li { margin: 0.3rem 0; padding-left: 0.25rem; }`
