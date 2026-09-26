import type { Chapter } from '../chapters';
import { styled } from '../theme';

const Overlay = styled.button`
  background: rgba(36, 34, 30, 0.22);
  border: 0;
  inset: 0;
  padding: 0;
  position: fixed;
  z-index: 20;

  @media (min-width: ${({ theme }) => theme.breakpoint.sidebar}) {
    display: none;
  }
`;

const Sidebar = styled.aside<{ $open: boolean }>`
  border-right: 1px solid ${({ theme }) => theme.color.border};
  height: 100vh;
  padding: 2.6rem 2rem;
  position: sticky;
  top: 0;

  @media (max-width: ${({ theme }) => theme.breakpoint.sidebar}) {
    background: ${({ theme }) => theme.color.background};
    box-shadow: ${({ $open }) =>
      $open ? '0 0 2rem rgba(36, 34, 30, 0.18)' : 'none'};
    height: 100dvh;
    left: 0;
    overflow-y: auto;
    position: fixed;
    top: 0;
    transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
    transition:
      box-shadow 180ms ease,
      transform 180ms ease;
    width: min(19rem, calc(100vw - 3rem));
    z-index: 25;
  }
`;

const Wordmark = styled.a`
  color: inherit;
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  position: relative;
  text-decoration: none;
  transform: translateY(2rem);
`;

const Label = styled.p`
  color: ${({ theme }) => theme.color.muted};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  letter-spacing: 0.09em;
  margin: 3.5rem 0 1rem;
  text-transform: uppercase;
`;

const Navigation = styled.nav`
  display: grid;
  gap: 0.2rem;
`;

const ChapterButton = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? theme.color.selected : 'none'};
  border: 0;
  border-radius: 0.2rem;
  cursor: pointer;
  display: grid;
  font-size: 1.04rem;
  gap: 0.8rem;
  grid-template-columns: 1.5rem 1fr;
  padding: 0.55rem 0.45rem;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.color.selected};
  }
`;

const ChapterNumber = styled.span`
  color: ${({ theme }) => theme.color.mutedLight};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  padding-top: 0.35rem;
`;

type TextbookSidebarProps = {
  activeChapterId: string;
  chapters: Chapter[];
  isOpen: boolean;
  onChapterChange: (id: string) => void;
  onClose: () => void;
};

export function TextbookSidebar({
  activeChapterId,
  chapters,
  isOpen,
  onChapterChange,
  onClose,
}: TextbookSidebarProps) {
  return (
    <>
      {isOpen && <Overlay aria-label="Close chapters" onClick={onClose} />}
      <Sidebar $open={isOpen} id="textbook-sidebar">
        <Wordmark href="/">ASYNCING</Wordmark>
        <Label>Navigate...</Label>
        <Navigation aria-label="Chapters">
          {chapters.map((chapter, index) => (
            <ChapterButton
              $active={chapter.id === activeChapterId}
              key={chapter.id}
              onClick={() => onChapterChange(chapter.id)}
            >
              <ChapterNumber>
                {String(index + 1).padStart(2, '0')}
              </ChapterNumber>
              {chapter.title}
            </ChapterButton>
          ))}
        </Navigation>
      </Sidebar>
    </>
  );
}
