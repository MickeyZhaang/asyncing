import type { Chapter } from '../chapters';
import { Markdown } from '../Markdown';
import { styled } from '../theme';

const Reader = styled.main`
  margin: 0 auto;
  max-width: 56rem;
  padding: 6rem 4rem 2rem;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: 6rem 1.5rem 2rem;
  }
`;

const Eyebrow = styled.p`
  color: ${({ theme }) => theme.color.muted};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  letter-spacing: 0.09em;
  margin: 0 0 1.2rem;
  text-transform: uppercase;
`;
const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  display: flex;
  font-size: 1.05rem;
  justify-content: space-between;
  margin-top: 5rem;
  padding: 1.5rem 0 3rem;
`;
const ChapterLink = styled.button`
  background: none;
  border: 0;
  color: ${({ theme }) => theme.color.link};
  cursor: pointer;
  padding: 0;
`;
type ChapterReaderProps = {
  activeIndex: number;
  chapter: Chapter;
  chapters: Chapter[];
  onChapterChange: (id: string) => void;
};

export function ChapterReader({
  activeIndex,
  chapter,
  chapters,
  onChapterChange,
}: ChapterReaderProps) {
  const previousChapter = chapters[activeIndex - 1];
  const nextChapter = chapters[activeIndex + 1];
  return (
    <Reader>
      <Eyebrow>Chapter {String(activeIndex + 1).padStart(2, '0')}</Eyebrow>
      <Markdown source={chapter.source} />
      <Footer>
        {previousChapter ? (
          <ChapterLink onClick={() => onChapterChange(previousChapter.id)}>
            ← {previousChapter.title}
          </ChapterLink>
        ) : (
          <span />
        )}
        {nextChapter ? (
          <ChapterLink onClick={() => onChapterChange(nextChapter.id)}>
            {nextChapter.title} →
          </ChapterLink>
        ) : (
          <span />
        )}
      </Footer>
    </Reader>
  );
}
