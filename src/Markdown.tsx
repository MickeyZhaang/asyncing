import type { ReactNode } from 'react';
import { Article } from './markdown/Article';
import { CodeBlock } from './markdown/blocks/code/CodeBlock';
import { Heading } from './markdown/blocks/heading/Heading';
import { List } from './markdown/blocks/list/List';
import { Paragraph } from './markdown/blocks/paragraph/Paragraph';
import { Quote } from './markdown/blocks/quote/Quote';
import { Rule } from './markdown/blocks/rule/Rule';
import { Arrow, InlineCode, Link } from './markdown/inline/InlineElements';
import { parseBlocks } from './markdown/parser';
import { parseInline } from './markdown/inline/parse';

function prose(value: string): ReactNode[] {
  return value
    .replace(/(?<!-)--(?!-)/g, '—')
    .replace(/->/g, '→')
    .split('→')
    .flatMap((piece, index) =>
      index === 0 ? [piece] : [<Arrow key={index}>→</Arrow>, piece],
    );
}

function inline(value: string): ReactNode[] {
  return parseInline(value).map((token, index) => {
    switch (token.type) {
      case 'strong':
        return <strong key={index}>{prose(token.value)}</strong>;
      case 'emphasis':
        return <em key={index}>{prose(token.value)}</em>;
      case 'code':
        return <InlineCode key={index}>{token.value}</InlineCode>;
      case 'link':
        return (
          <Link key={index} href={token.href} target="_blank" rel="noreferrer">
            {prose(token.label)}
          </Link>
        );
      case 'text':
        return prose(token.value);
    }
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
