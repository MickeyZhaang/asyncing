import { useEffect, useState } from "react";
import { ChapterReader } from "./components/ChapterReader";
import { EmptyState } from "./components/EmptyState";
import { AppShell } from "./components/AppShell";
import { TextbookSidebar } from "./components/TextbookSidebar";
import { chapters } from "./chapters";

function App() {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id ?? "");
  const activeIndex = chapters.findIndex(
    (chapter) => chapter.id === activeChapterId,
  );
  const activeChapter = chapters[activeIndex];

  useEffect(() => {
    document.title = activeChapter
      ? `${activeChapter.title} · Asyncing`
      : "Asyncing";
  }, [activeChapter]);

  if (!activeChapter) return <EmptyState />;

  return (
    <AppShell>
      <TextbookSidebar
        activeChapterId={activeChapterId}
        chapters={chapters}
        onChapterChange={setActiveChapterId}
      />
      <ChapterReader
        activeIndex={activeIndex}
        chapter={activeChapter}
        chapters={chapters}
        onChapterChange={setActiveChapterId}
      />
    </AppShell>
  );
}

export default App;
