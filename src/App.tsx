import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { LiveStatusPage } from './pages/LiveStatusPage';
import { ExamPatternPage } from './pages/ExamPatternPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { SyllabusHubPage } from './pages/SyllabusHubPage';
import { SubjectMasterPage } from './pages/SubjectMasterPage';
import { ChapterDetailPage } from './pages/ChapterDetailPage';
import { NcertMasterPage } from './pages/NcertMasterPage';
import { PracticeEnginePage } from './pages/PracticeEnginePage';
import { FullMockTestPage } from './pages/FullMockTestPage';
import { PyqMasterPage } from './pages/PyqMasterPage';
import { ErrorNotebookPage } from './pages/ErrorNotebookPage';
import { FlashcardPage } from './pages/FlashcardPage';
import { FormulaBookPage } from './pages/FormulaBookPage';
import { ReactionMapPage } from './pages/ReactionMapPage';
import { DiagramEnginePage } from './pages/DiagramEnginePage';
import { BookLibraryPage } from './pages/BookLibraryPage';
import { MedicalScienceAwarenessPage } from './pages/MedicalScienceAwarenessPage';
import { CounsellingPage } from './pages/CounsellingPage';
import { CollegeDatabasePage } from './pages/CollegeDatabasePage';
import { StudyPlanGeneratorPage } from './pages/StudyPlanGeneratorPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { RapidRevisionPage } from './pages/RapidRevisionPage';
import { ExamDayPage } from './pages/ExamDayPage';

import { ChapterSyllabus, Subject } from './types';
import physicsChapters from './data/syllabus/physics.json';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Selected chapter for ChapterDetailPage
  const [selectedChapter, setSelectedChapter] = useState<ChapterSyllabus | null>(
    (physicsChapters[0] as ChapterSyllabus) || null
  );

  // Practice engine initial chapter filter
  const [practiceChapterFilter, setPracticeChapterFilter] = useState<string | undefined>(undefined);

  const handleSelectChapter = (chapter: ChapterSyllabus) => {
    setSelectedChapter(chapter);
    setActiveTab('chapter-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartChapterPractice = (chapterName: string) => {
    setPracticeChapterFilter(chapterName);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tabId: string, payload?: any) => {
    if (tabId === 'practice' && payload?.chapterName) {
      setPracticeChapterFilter(payload.chapterName);
    } else {
      setPracticeChapterFilter(undefined);
    }
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'live-status':
        return <LiveStatusPage onNavigateHome={() => setActiveTab('home')} />;
      case 'exam-pattern':
        return <ExamPatternPage onNavigateHome={() => setActiveTab('home')} />;
      case 'eligibility':
        return <EligibilityPage onNavigateHome={() => setActiveTab('home')} />;
      case 'syllabus':
        return (
          <SyllabusHubPage
            onNavigateHome={() => setActiveTab('home')}
            onSelectSubject={(subj) => {
              setActiveTab(subj.toLowerCase());
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'physics':
        return (
          <SubjectMasterPage
            subject="Physics"
            onNavigateHome={() => setActiveTab('home')}
            onSelectChapter={handleSelectChapter}
            onStartChapterPractice={handleStartChapterPractice}
          />
        );
      case 'chemistry':
        return (
          <SubjectMasterPage
            subject="Chemistry"
            onNavigateHome={() => setActiveTab('home')}
            onSelectChapter={handleSelectChapter}
            onStartChapterPractice={handleStartChapterPractice}
          />
        );
      case 'biology':
        return (
          <SubjectMasterPage
            subject="Biology"
            onNavigateHome={() => setActiveTab('home')}
            onSelectChapter={handleSelectChapter}
            onStartChapterPractice={handleStartChapterPractice}
          />
        );
      case 'chapter-detail':
        return selectedChapter ? (
          <ChapterDetailPage
            chapter={selectedChapter}
            onNavigateBack={() => setActiveTab(selectedChapter.subject.toLowerCase())}
            onNavigateHome={() => setActiveTab('home')}
            onStartPractice={handleStartChapterPractice}
          />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'ncert-master':
        return <NcertMasterPage onNavigateHome={() => setActiveTab('home')} />;
      case 'practice':
        return (
          <PracticeEnginePage
            onNavigateHome={() => setActiveTab('home')}
            initialChapterFilter={practiceChapterFilter}
          />
        );
      case 'mock-tests':
        return <FullMockTestPage onNavigateHome={() => setActiveTab('home')} />;
      case 'pyqs':
        return <PyqMasterPage onNavigateHome={() => setActiveTab('home')} />;
      case 'error-notebook':
        return (
          <ErrorNotebookPage
            onNavigateHome={() => setActiveTab('home')}
            onPracticeAgain={(ids) => {
              setActiveTab('practice');
            }}
          />
        );
      case 'flashcards':
        return <FlashcardPage onNavigateHome={() => setActiveTab('home')} />;
      case 'formula-book':
        return <FormulaBookPage onNavigateHome={() => setActiveTab('home')} />;
      case 'reaction-map':
        return <ReactionMapPage onNavigateHome={() => setActiveTab('home')} />;
      case 'diagrams':
        return <DiagramEnginePage onNavigateHome={() => setActiveTab('home')} />;
      case 'books':
        return (
          <BookLibraryPage
            onNavigateHome={() => setActiveTab('home')}
            onMapToSyllabus={(subj) => setActiveTab(subj.toLowerCase())}
          />
        );
      case 'awareness':
        return <MedicalScienceAwarenessPage onNavigateHome={() => setActiveTab('home')} />;
      case 'counselling':
        return <CounsellingPage onNavigateHome={() => setActiveTab('home')} />;
      case 'colleges':
        return <CollegeDatabasePage onNavigateHome={() => setActiveTab('home')} />;
      case 'planner':
        return <StudyPlanGeneratorPage onNavigateHome={() => setActiveTab('home')} />;
      case 'roadmap':
        return (
          <RoadmapPage
            onNavigateHome={() => setActiveTab('home')}
            onNavigateTab={handleNavigate}
          />
        );
      case 'rapid-revision':
        return (
          <RapidRevisionPage
            onNavigateHome={() => setActiveTab('home')}
            onNavigateTab={handleNavigate}
          />
        );
      case 'exam-day':
        return <ExamDayPage onNavigateHome={() => setActiveTab('home')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 lg:pl-80 pb-24 lg:pb-12">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer (desktop with sidebar offset) */}
      <div className="lg:pl-72">
        <Footer />
      </div>
    </div>
  );
};
