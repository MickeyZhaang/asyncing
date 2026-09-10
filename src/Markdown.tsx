import type { ReactNode } from "react";
import { styled } from "./theme";

type Block =
  | { type: "code"; language: string; value: string }
  | { type: "heading"; depth: number; value: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; value: string }
  | { type: "rule" }
  | { type: "paragraph"; value: string };

const Article = styled.article`
  font-size: 1.24rem;
  line-height: 1.6;
  max-width: 42rem;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: 1.15rem;
  }
`;
const Heading = styled.h1`
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 1.06;
  margin: 2.5em 0 0.65em;
  &[data-depth="1"] {
    font-size: clamp(3.1rem, 7vw, 5.4rem);
    margin-top: 0;
  }
  &[data-depth="2"] {
    font-size: 2.25rem;
  }
  &[data-depth="3"] {
    font-size: 1.55rem;
  }
`;
const Paragraph = styled.p`
  margin: 0 0 1.25rem;
`;
const Link = styled.a`
  color: ${({ theme }) => theme.color.link};
  text-decoration-thickness: 1px;
  text-underline-offset: 0.16em;
`;
const InlineCode = styled.code`
  background: ${({ theme }) => theme.color.inlineCode};
  border-radius: 0.2rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.76em;
  padding: 0.14em 0.3em;
`;
const CodeBlock = styled.pre`
  background: ${({ theme }) => theme.color.codeBackground};
  color: ${({ theme }) => theme.color.codeText};
  margin: 1.6rem 0;
  overflow: auto;
  padding: 1.3rem 1.5rem;
`;
const Quote = styled.blockquote`
  border-left: 2px solid ${({ theme }) => theme.color.quote};
  color: ${({ theme }) => theme.color.muted};
  margin: 1.8rem 0;
  padding-left: 1.4rem;
`;
const Rule = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 3rem 0;
`;
const List = styled.ul`
  li {
    margin: 0.3rem 0;
    padding-left: 0.25rem;
  }
`;

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }
    const fence = line.match(/^```([^`]*)$/);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```"))
        code.push(lines[index++]);
      if (index < lines.length) index += 1;
      blocks.push({
        type: "code",
        language: fence[1].trim(),
        value: code.join("\n"),
      });
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      blocks.push({
        type: "heading",
        depth: heading[1].length,
        value: heading[2],
      });
      index += 1;
      continue;
    }
    if (/^([-*_])\1\1+\s*$/.test(line)) {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }
    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith("> "))
        quote.push(lines[index++].slice(2));
      blocks.push({ type: "quote", value: quote.join(" ") });
      continue;
    }
    if (/^(?:[-*+] |\d+\. )(.+)$/.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const pattern = ordered ? /^\d+\. (.+)$/ : /^[-*+] (.+)$/;
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].match(pattern);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }
    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6}\s|```|> |[-*+] |\d+\. |([-*_])\2\2+\s*$)/.test(lines[index])
    )
      paragraph.push(lines[index++]);
    blocks.push({ type: "paragraph", value: paragraph.join(" ") });
  }
  return blocks;
}

function inline(value: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^\s)]+\))/g;
  return value
    .split(pattern)
    .filter(Boolean)
    .map((piece, index) => {
      if (piece.startsWith("**"))
        return <strong key={index}>{piece.slice(2, -2)}</strong>;
      if (piece.startsWith("*"))
        return <em key={index}>{piece.slice(1, -1)}</em>;
      if (piece.startsWith("`"))
        return <InlineCode key={index}>{piece.slice(1, -1)}</InlineCode>;
      const link = piece.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
      if (link)
        return (
          <Link key={index} href={link[2]} target="_blank" rel="noreferrer">
            {link[1]}
          </Link>
        );
      return piece;
    });
}

export function Markdown({ source }: { source: string }) {
  return (
    <Article>
      {parseBlocks(source).map((block, index) => {
        if (block.type === "code")
          return (
            <CodeBlock key={index}>
              <code data-language={block.language}>{block.value}</code>
            </CodeBlock>
          );
        if (block.type === "heading")
          return (
            <Heading
              as={`h${block.depth}`}
              data-depth={block.depth}
              key={index}
            >
              {inline(block.value)}
            </Heading>
          );
        if (block.type === "list")
          return (
            <List as={block.ordered ? "ol" : "ul"} key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{inline(item)}</li>
              ))}
            </List>
          );
        if (block.type === "quote")
          return <Quote key={index}>{inline(block.value)}</Quote>;
        if (block.type === "rule") return <Rule key={index} />;
        return <Paragraph key={index}>{inline(block.value)}</Paragraph>;
      })}
    </Article>
  );
}
