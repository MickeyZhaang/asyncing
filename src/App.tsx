import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ChapterReader } from './components/ChapterReader'
import { EmptyState } from './components/EmptyState'
import { TextbookSidebar } from './components/TextbookSidebar'
import { chapters } from './chapters'

function Textbook() {
  const navigate = useNavigate()
  const { '*': chapterId } = useParams()
  const activeIndex = chapters.findIndex((chapter) => chapter.id === chapterId)
  const activeChapter = chapters[activeIndex]

  useEffect(() => {
    document.title = activeChapter ? `${activeChapter.title} · Asyncing` : 'Asyncing'
  }, [activeChapter])

  if (!activeChapter) return <Navigate replace to={`/chapters/${chapters[0]?.id ?? ''}`} />

  const openChapter = (id: string) => navigate(`/chapters/${id}`)

  return <AppShell><TextbookSidebar activeChapterId={activeChapter.id} chapters={chapters} onChapterChange={openChapter} /><ChapterReader activeIndex={activeIndex} chapter={activeChapter} chapters={chapters} onChapterChange={openChapter} /></AppShell>
}

function App() {
  if (!chapters.length) return <EmptyState />

  return <Routes><Route element={<Navigate replace to={`/chapters/${chapters[0].id}`} />} path="/" /><Route element={<Textbook />} path="/chapters/*" /><Route element={<Navigate replace to={`/chapters/${chapters[0].id}`} />} path="*" /></Routes>
}

export default App
