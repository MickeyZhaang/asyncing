import { useEffect, useState } from 'react';
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
  const activeIndex = chapters.findIndex((chapter) => chapter.id === chapterId);
  const activeChapter = chapters[activeIndex];

  useEffect(() => {
    document.title = activeChapter
      ? `${activeChapter.title} · Asyncing`
      : 'Asyncing';
  }, [activeChapter]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSidebarOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isSidebarOpen]);

  if (!activeChapter)
    return <Navigate replace to={`/chapters/${chapters[0]?.id ?? ''}`} />;

  const openChapter = (id: string) => {
    navigate(`/chapters/${id}`);
    setIsSidebarOpen(false);
  };

  return (
    <AppShell>
      <SidebarToggle
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <TextbookSidebar
        activeChapterId={activeChapter.id}
        chapters={chapters}
        isOpen={isSidebarOpen}
        onChapterChange={openChapter}
        onClose={() => setIsSidebarOpen(false)}
      />
      <ChapterReader
        activeIndex={activeIndex}
        chapter={activeChapter}
        chapters={chapters}
        onChapterChange={openChapter}
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
