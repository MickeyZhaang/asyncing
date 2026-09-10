import type { ReactNode } from 'react';
import { Article } from './markdown/Article';
import { CodeBlock } from './markdown/blocks/code/CodeBlock';
import { Heading } from './markdown/blocks/heading/Heading';
import { List } from './markdown/blocks/list/List';
import { Paragraph } from './markdown/blocks/paragraph/Paragraph';
import { Quote } from './markdown/blocks/quote/Quote';
import { Rule } from './markdown/blocks/rule/Rule';
import { InlineCode, Link } from './markdown/inline/InlineElements';
import { parseBlocks } from './markdown/parser';

function inline(value: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^\s)]+\))/g;
  return value
    .split(pattern)
    .filter(Boolean)
    .map((piece, index) => {
      if (piece.startsWith('**'))
        return <strong key={index}>{piece.slice(2, -2)}</strong>;
      if (piece.startsWith('*'))
        return <em key={index}>{piece.slice(1, -1)}</em>;
      if (piece.startsWith('`'))
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
        switch (block.type) {
          case 'code':
            return (
              <CodeBlock
                key={index}
                language={block.language}
                value={block.value}
              />
            );
          case 'heading':
            return (
              <Heading depth={block.depth} key={index}>
                {inline(block.value)}
              </Heading>
            );
          case 'list':
            return (
              <List key={index} ordered={block.ordered}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{inline(item)}</li>
                ))}
              </List>
            );
          case 'quote':
            return <Quote key={index}>{inline(block.value)}</Quote>;
          case 'rule':
            return <Rule key={index} />;
          case 'paragraph':
            return <Paragraph key={index}>{inline(block.value)}</Paragraph>;
        }
      })}
    </Article>
  );
}
