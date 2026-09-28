import React from 'react';
import {
  Activity,
  Layers,
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Sparkles,
  BookMarked,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Award,
  Zap,
  ChevronRight,
  Bookmark,
  Calendar,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { questionStats } from '../data/questions';
import currentExamData from '../data/exams/neet-ug-current.json';

interface HomePageProps {
  onNavigate: (tabId: string, payload?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  const pipelineSteps = [
    { step: "0", name: "ZERO", desc: "Exam Demystified", tab: "roadmap" },
    { step: "1", name: "FOUNDATION", desc: "Basics & Units", tab: "syllabus" },
    { step: "2", name: "NCERT", desc: "Line-by-Line", tab: "ncert-master" },
    { step: "3", name: "CONCEPT", desc: "Formulas & Maps", tab: "formula-book" },
    { step: "4", name: "PRACTICE", desc: "Topic Graded", tab: "practice" },
    { step: "5", name: "PYQ", desc: "Verified Trends", tab: "pyqs" },
    { step: "6", name: "MOCK", desc: "Full 720 Simulation", tab: "mock-tests" },
    { step: "7", name: "REVISION", desc: "Spaced Leitner", tab: "flashcards" },
    { step: "8", name: "EXAM", desc: "Target 720/720", tab: "exam-day" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-slate-900 to-medical-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-brand-800/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-medical-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>NMC & NTA Harmonized • NEET-UG {currentExamData.year} Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            NEET MASTER
            <span className="block text-xl sm:text-2xl font-medium text-slate-300 mt-2">
              Complete NEET-UG Learning, Practice, PYQ, Mock Test & Revision Platform
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            The official-aligned preparation portal for Indian medical entrance aspirants. From NCERT fundamentals to verified past-year questions, 720-mark simulated full mocks, and smart spaced revision.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('practice')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-medical-500 hover:from-brand-600 hover:to-medical-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4" />
              <span>{t('btn.startPractice')} ({questionStats.total} Questions)</span>
            </button>

            <button
              onClick={() => onNavigate('mock-tests')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm flex items-center gap-2 transition-all"
            >
              <Clock className="w-4 h-4" />
              <span>{t('btn.takeMock')}</span>
            </button>

            <button
              onClick={() => onNavigate('roadmap')}
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4 text-brand-400" />
              <span>0-to-NEET Roadmap</span>
            </button>
          </div>
        </div>

        {/* Live Exam Badge Header */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Exam Date:</span>
            <span className="font-bold text-slate-100 text-sm">{currentExamData.examDate}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Questions Bank:</span>
            <span className="font-bold text-brand-400 text-sm">{questionStats.total} Real Items</span>
          </div>
          <div>
            <span className="text-slate-400 block">Verified PYQs:</span>
            <span className="font-bold text-amber-400 text-sm">{questionStats.pyqs} Cataloged</span>
          </div>
          <div>
            <span className="text-slate-400 block">Official Syllabus:</span>
            <span className="font-bold text-emerald-400 text-sm">NMC Revised Active</span>
          </div>
        </div>
      </section>

      {/* The 9-Stage Zero to Exam Preparation Pipeline */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>The 9-Stage NEET Mastery Pipeline</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Structured progressive path: From Zero understanding to 720/720 Exam Day confidence
            </p>
          </div>
          <button
            onClick={() => onNavigate('roadmap')}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>Full Roadmap</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 pt-2">
          {pipelineSteps.map((p, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(p.tab)}
              className="flex flex-col items-center text-center p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-950/20 transition-all group"
            >
              <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 text-xs font-bold flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                {p.step}
              </span>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                {p.name}
              </span>
              <span className="text-[9px] text-slate-400 truncate w-full mt-0.5">
                {p.desc}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Feature Cards Grid */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>Core Preparation Centers</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. LATEST NEET UPDATE */}
          <div
            onClick={() => onNavigate('live-status')}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all space-y-3 relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  LATEST NEET UPDATE
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Official notifications, dates, correction window, eligibility circulars, and verified bulletins.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <span>View NEET Center</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. SYLLABUS */}
          <div
            onClick={() => onNavigate('syllabus')}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                COMPLETE SYLLABUS
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Physics, Chemistry & Biology. Exact NMC additions (Frog, Families, Practical Physics) and deleted chapters marked.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <span>Explore 3 Subjects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. NCERT MASTER */}
          <div
            onClick={() => onNavigate('ncert-master')}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                NCERT MASTER
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Class 11 & 12 Biology, Chemistry, Physics. Line-by-line concept breakdown, high-yield facts, and highlighting system.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <span>Open NCERT Engine</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. PYQs */}
          <div
            onClick={() => onNavigate('pyqs')}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  VERIFIED PYQ MASTER
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {questionStats.pyqs} PYQs
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Authentic previous year questions with chapter frequency, repeat trends, formula occurrence, and year-by-year papers.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <span>View PYQ Analysis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 5. PRACTICE */}
          <div
            onClick={() => onNavigate('practice')}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  PRACTICE ENGINE
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  {questionStats.total} Questions
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Quick 10, Topic 20, Chapter 30, Subject 50, Mixed 100, Weak Areas, and Wrong Answers retry modes.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <span>Launch Practice</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 6. MOCK TESTS */}
          <div
            onClick={() => onNavigate('mock-tests')}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                FULL MOCK TESTS
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Official NEET simulation with Section A (35) + Section B (15), 200 minutes timer, +4/-1 auto scoring, and deep analytics.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <span>Start 720-Mark Mock</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 7. CURRENT AFFAIRS / MEDICAL AWARENESS */}
          <div
            onClick={() => onNavigate('awareness')}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                MEDICAL & SCIENCE AWARENESS
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Nobel discoveries, CRISPR therapies, AI diagnostic radiology. Enriching awareness clearly labeled non-syllabus.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <span>Read Science Articles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 8. BOOKS LIBRARY */}
          <div
            onClick={() => onNavigate('books')}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                NEET BOOK LIBRARY
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Verified books from NCERT, MTG, Arihant, HC Verma, Balaji with 100% legitimate legal purchase links (zero piracy).
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <span>Browse Book Directory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 9. REVISION & ERROR NOTEBOOK */}
          <div
            onClick={() => onNavigate('error-notebook')}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 flex items-center justify-center font-bold">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                ERROR NOTEBOOK & REVISION
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Automatically saves mistakes with 8 diagnostic classifications (Concept Gap, Silly Mistake, Formula Error), notes, and Leitner flashcards.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <span>Open Error Notebook</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Subject Quick Breakdown Banner */}
      <section className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          Subject Question Distribution in NEET MASTER Database
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('physics')}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-brand-500 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 dark:text-slate-100">Physics</span>
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">{questionStats.physics} Questions</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(questionStats.physics / questionStats.total) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">16 Chapters • Mechanics, Electrodynamics, Optics, Modern Physics</p>
          </div>

          <div
            onClick={() => onNavigate('chemistry')}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-brand-500 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 dark:text-slate-100">Chemistry</span>
              <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400">{questionStats.chemistry} Questions</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-teal-600 h-2 rounded-full"
                style={{ width: `${(questionStats.chemistry / questionStats.total) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">15 Chapters • Physical, Inorganic, Organic with named reactions</p>
          </div>

          <div
            onClick={() => onNavigate('biology')}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-brand-500 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 dark:text-slate-100">Biology</span>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{questionStats.biology} Questions</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{ width: `${(questionStats.biology / questionStats.total) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">9 Units • Botany & Zoology, 360/720 marks weightage</p>
          </div>
        </div>
      </section>
    </div>
  );
};
