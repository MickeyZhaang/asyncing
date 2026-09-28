import { useState } from 'react';
import { Check, Clipboard } from '@asyncing/icons';
import { styled } from '@asyncing/styled';

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

const Code = styled.pre`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.82rem;
  line-height: 1.65;
  margin: 0;
  overflow: auto;
  padding: 1.2rem 1.4rem 1.4rem;
`;

const CopyButton = styled.button`
  display: flex;
  background: none;
  border: 0;
  color: rgba(247, 242, 232, 0.64);
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  padding: 0;
  text-transform: uppercase;
`;

export function CodeBlock({
  language,
  value,
}: {
  language: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 2_000);
  };

  return (
    <Frame>
      <Header>
        <span>{language || 'text'}</span>
        <CopyButton
          aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
          onClick={copy}
          title={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? <Check size={16} /> : <Clipboard size={16} />}
        </CopyButton>
      </Header>
      <Code>
        <code>{value}</code>
      </Code>
    </Frame>
  );
}
