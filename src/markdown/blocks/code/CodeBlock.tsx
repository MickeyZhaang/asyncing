import { styled } from '../../../theme';

const Frame = styled.figure`
  background: ${({ theme }) => theme.color.codeBackground};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.color.codeText};
  margin: 1.75rem 0;
  overflow: hidden;
`;
const Header = styled.figcaption`
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(247, 242, 232, 0.64);
  display: flex;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  justify-content: space-between;
  letter-spacing: 0.08em;
  padding: 0.65rem 1rem;
  text-transform: uppercase;
`;
const Dots = styled.span`
  display: flex;
  gap: 0.3rem;
`;
const Dot = styled.i`
  background: rgba(247, 242, 232, 0.3);
  border-radius: 50%;
  display: block;
  height: 0.38rem;
  width: 0.38rem;
`;
const Code = styled.pre`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.82rem;
  line-height: 1.65;
  margin: 0;
  overflow: auto;
  padding: 1.2rem 1.4rem 1.4rem;
`;

export function CodeBlock({
  language,
  value,
}: {
  language: string;
  value: string;
}) {
  return (
    <Frame>
      <Header>
        <span>{language || 'text'}</span>
        <Dots aria-hidden="true">
          <Dot />
          <Dot />
          <Dot />
        </Dots>
      </Header>
      <Code>
        <code>{value}</code>
      </Code>
    </Frame>
  );
}
