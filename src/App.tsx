import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { ChapterReader } from './components/ChapterReader';
import { EmptyState } from './components/EmptyState';
import { SidebarToggle } from './components/SidebarToggle';
import { TextbookSidebar } from './components/TextbookSidebar';
import { chapters } from './chapters';

function Textbook() {
  const navigate = useNavigate();
  const { '*': chapterId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const readerRef = useRef<HTMLElement>(null);
  const sidebarToggleRef = useRef<HTMLButtonElement>(null);
  const activeIndex = chapters.findIndex((chapter) => chapter.id === chapterId);
  const activeChapter = chapters[activeIndex];

  useEffect(() => {
    document.title = activeChapter
      ? `${activeChapter.title} · Asyncing`
      : 'Asyncing';
  }, [activeChapter]);

  useLayoutEffect(() => {
    if (activeChapter) window.scrollTo({ left: 0, top: 0 });
  }, [activeChapter]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsSidebarOpen(false);
      sidebarToggleRef.current?.focus();
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isSidebarOpen]);

  if (!activeChapter)
    return <Navigate replace to={`/chapters/${chapters[0]?.id ?? ''}`} />;

  const openChapter = (id: string) => {
    navigate(`/chapters/${id}`);
    setIsSidebarOpen(false);
    window.requestAnimationFrame(() => {
      readerRef.current?.focus({ preventScroll: true });
    });
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    sidebarToggleRef.current?.focus();
  };

  return (
    <AppShell>
      <SidebarToggle
        ref={sidebarToggleRef}
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <TextbookSidebar
        activeChapterId={activeChapter.id}
        chapters={chapters}
        isOpen={isSidebarOpen}
        onChapterChange={openChapter}
        onClose={closeSidebar}
      />
      <ChapterReader
        activeIndex={activeIndex}
        chapter={activeChapter}
        chapters={chapters}
        inert={isSidebarOpen}
        onChapterChange={openChapter}
        ref={readerRef}
      />
    </AppShell>
  );
}

function App() {
  if (!chapters.length) return <EmptyState />;

  return (
    <Routes>
      <Route
        element={<Navigate replace to={`/chapters/${chapters[0].id}`} />}
        path="/"
      />
      <Route element={<Textbook />} path="/chapters/*" />
      <Route
        element={<Navigate replace to={`/chapters/${chapters[0].id}`} />}
        path="*"
      />
    </Routes>
  );
}

export default App;
