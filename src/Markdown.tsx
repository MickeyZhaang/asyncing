import type { ReactNode } from 'react'
import { CodeBlock } from './components/markdown/CodeBlock'
import { Article, Heading, InlineCode, Link, List, Paragraph, Quote, Rule } from './components/markdown/MarkdownElements'

type Block = { type: 'code'; language: string; value: string } | { type: 'heading'; depth: number; value: string } | { type: 'list'; ordered: boolean; items: string[] } | { type: 'quote'; value: string } | { type: 'rule' } | { type: 'paragraph'; value: string }

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: Block[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    if (!line.trim()) { index += 1; continue }
    const fence = line.match(/^```([^`]*)$/)
    if (fence) { const code: string[] = []; index += 1; while (index < lines.length && !lines[index].startsWith('```')) code.push(lines[index++]); if (index < lines.length) index += 1; blocks.push({ type: 'code', language: fence[1].trim(), value: code.join('\n') }); continue }
    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) { blocks.push({ type: 'heading', depth: heading[1].length, value: heading[2] }); index += 1; continue }
    if (/^([-*_])\1\1+\s*$/.test(line)) { blocks.push({ type: 'rule' }); index += 1; continue }
    if (line.startsWith('> ')) { const quote: string[] = []; while (index < lines.length && lines[index].startsWith('> ')) quote.push(lines[index++].slice(2)); blocks.push({ type: 'quote', value: quote.join(' ') }); continue }
    if (/^(?:[-*+] |\d+\. )(.+)$/.test(line)) { const ordered = /^\d+\. /.test(line); const pattern = ordered ? /^\d+\. (.+)$/ : /^[-*+] (.+)$/; const items: string[] = []; while (index < lines.length) { const item = lines[index].match(pattern); if (!item) break; items.push(item[1]); index += 1 }; blocks.push({ type: 'list', ordered, items }); continue }
    const paragraph: string[] = []
    while (index < lines.length && lines[index].trim() && !/^(#{1,6}\s|```|> |[-*+] |\d+\. |([-*_])\2\2+\s*$)/.test(lines[index])) paragraph.push(lines[index++])
    blocks.push({ type: 'paragraph', value: paragraph.join(' ') })
  }
  return blocks
}

function inline(value: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^\s)]+\))/g
  return value.split(pattern).filter(Boolean).map((piece, index) => {
    if (piece.startsWith('**')) return <strong key={index}>{piece.slice(2, -2)}</strong>
    if (piece.startsWith('*')) return <em key={index}>{piece.slice(1, -1)}</em>
    if (piece.startsWith('`')) return <InlineCode key={index}>{piece.slice(1, -1)}</InlineCode>
    const link = piece.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/)
    if (link) return <Link key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</Link>
    return piece
  })
}

export function Markdown({ source }: { source: string }) {
  return <Article>{parseBlocks(source).map((block, index) => {
    if (block.type === 'code') return <CodeBlock key={index} language={block.language} value={block.value} />
    if (block.type === 'heading') return <Heading as={`h${block.depth}`} data-depth={block.depth} key={index}>{inline(block.value)}</Heading>
    if (block.type === 'list') return <List as={block.ordered ? 'ol' : 'ul'} key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</List>
    if (block.type === 'quote') return <Quote key={index}>{inline(block.value)}</Quote>
    if (block.type === 'rule') return <Rule key={index} />
    return <Paragraph key={index}>{inline(block.value)}</Paragraph>
  })}</Article>
}
