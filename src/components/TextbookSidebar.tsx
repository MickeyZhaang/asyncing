import type { Chapter } from '../chapters'
import { styled } from '../theme'

const Sidebar = styled.aside`
  border-right: 1px solid ${({ theme }) => theme.color.border}; height: 100vh; padding: 2.6rem 2rem; position: sticky; top: 0;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) { height: auto; padding: 1.3rem; position: static; }
`
const Wordmark = styled.a`color: inherit; font-size: 1.6rem; font-weight: 600; letter-spacing: -0.04em; text-decoration: none;`
const Label = styled.p`color: ${({ theme }) => theme.color.muted}; font-family: ${({ theme }) => theme.font.mono}; font-size: 0.68rem; letter-spacing: 0.09em; margin: 3.5rem 0 1rem; text-transform: uppercase; @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) { margin: 1.6rem 0 0.6rem; }`
const Navigation = styled.nav`display: grid; gap: 0.2rem; @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) { display: flex; overflow-x: auto; }`
const ChapterButton = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) => ($active ? theme.color.selected : 'none')}; border: 0; border-radius: 0.2rem; cursor: pointer; display: grid; font-size: 1.04rem; gap: 0.8rem; grid-template-columns: 1.5rem 1fr; padding: 0.55rem 0.45rem; text-align: left;
  &:hover { background: ${({ theme }) => theme.color.selected}; }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) { flex: 0 0 auto; }
`
const ChapterNumber = styled.span`color: ${({ theme }) => theme.color.mutedLight}; font-family: ${({ theme }) => theme.font.mono}; font-size: 0.65rem; padding-top: 0.35rem;`
type TextbookSidebarProps = { activeChapterId: string; chapters: Chapter[]; onChapterChange: (id: string) => void }

export function TextbookSidebar({ activeChapterId, chapters, onChapterChange }: TextbookSidebarProps) {
  return <Sidebar><Wordmark href="/">ASYNCING</Wordmark><Label>Book</Label><Navigation aria-label="Chapters">{chapters.map((chapter, index) => <ChapterButton $active={chapter.id === activeChapterId} key={chapter.id} onClick={() => onChapterChange(chapter.id)}><ChapterNumber>{String(index + 1).padStart(2, '0')}</ChapterNumber>{chapter.title}</ChapterButton>)}</Navigation></Sidebar>
}
