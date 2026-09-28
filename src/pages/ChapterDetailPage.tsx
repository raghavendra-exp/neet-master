import React, { useState } from 'react';
import {
  BookOpen,
  Target,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Bookmark,
  Share2,
  Atom,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ChapterSyllabus } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { allQuestions } from '../data/questions';
import { QuestionCard } from '../components/QuestionCard';

interface ChapterDetailPageProps {
  chapter: ChapterSyllabus;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onStartPractice: (chapterName: string) => void;
}

export const ChapterDetailPage: React.FC<ChapterDetailPageProps> = ({
  chapter,
  onNavigateBack,
  onNavigateHome,
  onStartPractice
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'concepts' | 'formulas' | 'mistakes' | 'pyqs' | 'books'>('concepts');

  const chapterQuestions = allQuestions.filter(q => q.chapter === chapter.name);
  const chapterPyqs = chapterQuestions.filter(q => q.isVerifiedPyq);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[
          { label: chapter.subject, onClick: onNavigateBack },
          { label: language === 'hi' ? chapter.nameHi : chapter.name }
        ]}
        onNavigateHome={onNavigateHome}
      />

      {/* Chapter Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
              {chapter.subject} • Class {chapter.classLevel}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {chapter.unit}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg">
              Weightage: ~{chapter.avgQuestionsPerYear} Qs ({chapter.weightagePercentage}%)
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {language === 'hi' ? chapter.nameHi : chapter.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 italic">
            NCERT Reference: {chapter.ncertBook} (Chapter {chapter.ncertChapterNumber})
          </p>
        </div>

        {/* Quick Trigger Practice CTA */}
        <div className="pt-2 flex flex-wrap gap-2.5">
          <button
            onClick={() => onStartPractice(chapter.name)}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-600/20 flex items-center gap-2 transition-all"
          >
            <Target className="w-4 h-4" />
            <span>Practice Chapter MCQs ({chapterQuestions.length} in DB)</span>
          </button>
        </div>
      </div>

      {/* Internal Chapter Engine Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'concepts', label: '1. Concepts & Syllabus' },
          { id: 'formulas', label: '2. Formulas & High-Yield' },
          { id: 'mistakes', label: '3. Common Mistakes & Tricks' },
          { id: 'pyqs', label: `4. Solved PYQs (${chapterPyqs.length})` },
          { id: 'books', label: '5. Recommended Books' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white dark:bg-brand-500 dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Concepts & Syllabus */}
      {activeTab === 'concepts' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Official Prescribed Syllabus & High-Yield Topics</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {chapter.topics.map((t, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      {language === 'hi' ? t.nameHi : t.name}
                    </h4>
                    {t.isNmcAdded && (
                      <span className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        ★ NMC Added High-Priority
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Core Concept Builder (NCERT Grounded)</span>
            </h2>

            <ul className="space-y-2.5">
              {chapter.keyConcepts.map((kc, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2.5 border border-slate-100 dark:border-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <span>{kc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Formulas & High Yield */}
      {activeTab === 'formulas' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Atom className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Essential Formula Sheet & Quick Notes</span>
          </h2>

          {chapter.formulaHints && chapter.formulaHints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.formulaHints.map((f, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900/50 space-y-1"
                >
                  <div className="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400">Formula Rule #{idx + 1}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 font-mono">
                    {f}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Key facts and reaction conditions are covered under Concept Builder.</p>
          )}
        </div>
      )}

      {/* Tab 3: Common Mistakes & Short Tricks */}
      {activeTab === 'mistakes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Common Traps & Mistakes to Avoid</span>
            </h2>
            <ul className="space-y-2.5">
              {chapter.commonMistakes.map((m, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed border border-rose-200 dark:border-rose-900/50">
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              <span>Short Tricks & Exam Mnemonics</span>
            </h2>
            <ul className="space-y-2.5">
              {chapter.shortTricks && chapter.shortTricks.map((t, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed border border-emerald-200 dark:border-emerald-900/50">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 4: Solved PYQs */}
      {activeTab === 'pyqs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Verified Previous Year Questions for {chapter.name}
            </h2>
            <span className="text-xs text-slate-500 font-semibold">{chapterPyqs.length} Verified PYQs</span>
          </div>

          <div className="space-y-4">
            {chapterPyqs.map((q, idx) => (
              <QuestionCard
                key={q.id}
                question={q}
                questionNumber={idx + 1}
                showImmediateFeedback={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Recommended Books */}
      {activeTab === 'books' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Recommended Reference Books for {chapter.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {chapter.recommendedBooks.map((b, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {b}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
