import React, { useState, useMemo } from 'react';
import {
  Target,
  Filter,
  CheckCircle2,
  XCircle,
  Bookmark,
  RotateCcw,
  Sparkles,
  Zap,
  TrendingUp,
  BookOpen,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuestionCard } from '../components/QuestionCard';
import { allQuestions } from '../data/questions';
import { Question, Subject, Difficulty, QuestionType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';

type PracticeMode =
  | 'all'
  | 'quick10'
  | 'topic20'
  | 'chapter30'
  | 'subject50'
  | 'mixed100'
  | 'pyq'
  | 'ncert'
  | 'weak'
  | 'wrong'
  | 'bookmarks';

interface PracticeEnginePageProps {
  onNavigateHome: () => void;
  initialChapterFilter?: string;
}

export const PracticeEnginePage: React.FC<PracticeEnginePageProps> = ({
  onNavigateHome,
  initialChapterFilter
}) => {
  const { language } = useLanguage();
  const { bookmarks, mistakes, recordPracticeAttempt } = useUserProgress();

  const [mode, setMode] = useState<PracticeMode>('all');
  const [subjectFilter, setSubjectFilter] = useState<Subject | 'all'>('all');
  const [chapterFilter, setChapterFilter] = useState<string>(initialChapterFilter || 'all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<QuestionType | 'all'>('all');

  const [currentPage, setCurrentPage] = useState<number>(0);

  // Extract chapters list
  const chaptersList = useMemo(() => {
    const list = Array.from(new Set(allQuestions.map(q => q.chapter)));
    return list.sort();
  }, []);

  // Filter questions based on selected mode and filters
  const filteredQuestions = useMemo(() => {
    let result = [...allQuestions];

    // Mode filter
    if (mode === 'pyq') {
      result = result.filter(q => q.isVerifiedPyq);
    } else if (mode === 'ncert') {
      result = result.filter(q => q.sourceType === 'NCERT' || q.tags.includes('ncert-based'));
    } else if (mode === 'bookmarks') {
      result = result.filter(q => bookmarks.includes(q.id));
    } else if (mode === 'wrong' || mode === 'weak') {
      const wrongIds = mistakes.map(m => m.questionId);
      result = result.filter(q => wrongIds.includes(q.id));
    }

    // Subject filter
    if (subjectFilter !== 'all') {
      result = result.filter(q => q.subject === subjectFilter);
    }

    // Chapter filter
    if (chapterFilter !== 'all') {
      result = result.filter(q => q.chapter === chapterFilter);
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter(q => q.difficulty === difficultyFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter(q => q.type === typeFilter);
    }

    // Quantity limits for preset modes
    if (mode === 'quick10') {
      return result.slice(0, 10);
    } else if (mode === 'topic20') {
      return result.slice(0, 20);
    } else if (mode === 'chapter30') {
      return result.slice(0, 30);
    } else if (mode === 'subject50') {
      return result.slice(0, 50);
    } else if (mode === 'mixed100') {
      return result.slice(0, 100);
    }

    return result;
  }, [mode, subjectFilter, chapterFilter, difficultyFilter, typeFilter, bookmarks, mistakes]);

  const pageSize = 10;
  const totalPages = Math.ceil(filteredQuestions.length / pageSize);
  const currentQuestions = filteredQuestions.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handleResetFilters = () => {
    setMode('all');
    setSubjectFilter('all');
    setChapterFilter('all');
    setDifficultyFilter('all');
    setTypeFilter('all');
    setCurrentPage(0);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'अभ्यास केंद्र' : 'Practice Engine' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>Intelligent NEET Practice Engine</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              1,500+ VERIFIED QUESTION BANK
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select your practice sprint: from Quick 10 drills to Chapter 30 mastery and Verified PYQs.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400 block">Available Matches</span>
            <span className="text-2xl font-black text-brand-700 dark:text-brand-300">{filteredQuestions.length} Questions</span>
          </div>
        </div>

        {/* Practice Mode Selector Pills */}
        <div className="pt-3 flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'quick10', label: '⚡ Quick 10' },
            { id: 'topic20', label: 'Topic 20' },
            { id: 'chapter30', label: 'Chapter 30' },
            { id: 'subject50', label: 'Subject 50' },
            { id: 'mixed100', label: 'Mixed 100' },
            { id: 'pyq', label: '⭐ PYQ Mode' },
            { id: 'ncert', label: '📖 NCERT Mode' },
            { id: 'wrong', label: `❌ Wrong Answers (${mistakes.length})` },
            { id: 'bookmarks', label: `🔖 Bookmarks (${bookmarks.length})` }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id as PracticeMode);
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mode === m.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Subject */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Subject</label>
          <select
            value={subjectFilter}
            onChange={(e) => {
              setSubjectFilter(e.target.value as any);
              setCurrentPage(0);
            }}
            className="w-full p-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
          >
            <option value="all">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
        </div>

        {/* Chapter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Chapter</label>
          <select
            value={chapterFilter}
            onChange={(e) => {
              setChapterFilter(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full p-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 truncate"
          >
            <option value="all">All Chapters</option>
            {chaptersList.map((ch, idx) => (
              <option key={idx} value={ch}>{ch}</option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Difficulty</label>
          <select
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value as any);
              setCurrentPage(0);
            }}
            className="w-full p-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Question Type */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Type</label>
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as any);
              setCurrentPage(0);
            }}
            className="w-full p-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
          >
            <option value="all">All Types</option>
            <option value="mcq">Standard MCQ</option>
            <option value="assertion_reason">Assertion-Reason</option>
            <option value="statement_based">Statement-Based</option>
            <option value="match">Match the Following</option>
            <option value="numerical">Numerical</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            onClick={handleResetFilters}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Target className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
              No Questions Match Your Current Filter Selection
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try choosing "All Subjects" or resetting the difficulty and mode filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          currentQuestions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              questionNumber={currentPage * pageSize + idx + 1}
              showImmediateFeedback={true}
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-slate-500">
            Page {currentPage + 1} of {totalPages} ({filteredQuestions.length} Questions)
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
