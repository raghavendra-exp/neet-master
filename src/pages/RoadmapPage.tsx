import React from 'react';
import { Compass, CheckCircle2, ChevronRight, Award, Zap, Target } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface RoadmapPageProps {
  onNavigateHome: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ onNavigateHome, onNavigateTab }) => {
  const roadmapLevels = [
    {
      level: 0,
      title: "Understand NEET-UG",
      desc: "Decode the exam pattern, 720-mark score calculation (+4/-1), NMC revised syllabus, and college cut-off benchmarks.",
      tabId: "exam-pattern",
      cta: "Explore Exam Pattern"
    },
    {
      level: 1,
      title: "NCERT Foundation",
      desc: "Line-by-line reading of Class 11 and 12 Biology, Chemistry in-text tables, and Physics basic definitions.",
      tabId: "ncert-master",
      cta: "Open NCERT Master"
    },
    {
      level: 2,
      title: "Basic Concepts & Units",
      desc: "Dimensional analysis, free-body diagrams, stoichiometric mole concepts, and cell organelle functions.",
      tabId: "syllabus",
      cta: "Review Core Concepts"
    },
    {
      level: 3,
      title: "Complete Official Syllabus",
      desc: "Cover all 16 Physics, 15 Chemistry, and 9 Biology units without skipping NMC practical additions.",
      tabId: "syllabus",
      cta: "Syllabus Checklist"
    },
    {
      level: 4,
      title: "Chapter-wise Practice (Level 1-3)",
      desc: "Solve minimum 30-50 graded MCQs immediately after completing every single chapter.",
      tabId: "practice",
      cta: "Practice Questions"
    },
    {
      level: 5,
      title: "Master Verified PYQs",
      desc: "Complete past 6 years (2020-2025) official papers to recognize high-frequency repeat themes.",
      tabId: "pyqs",
      cta: "Solve PYQ Master"
    },
    {
      level: 6,
      title: "Mixed Cross-Subject Practice",
      desc: "Time yourself on 100-question mixed tests simulating random shifts between Physics, Chemistry, and Biology.",
      tabId: "practice",
      cta: "Launch Mixed Drill"
    },
    {
      level: 7,
      title: "Full 720-Mark Simulation Mocks",
      desc: "Complete 15-20 full-length mocks from 2:00 PM to 5:20 PM strictly using OMR bubbles or simulator.",
      tabId: "mock-tests",
      cta: "Take Full Mock"
    },
    {
      level: 8,
      title: "Diagnostic Error Correction",
      desc: "Maintain your Error Notebook. Classify every negative mark as Concept Gap, Silly Mistake, or Formula Error.",
      tabId: "error-notebook",
      cta: "Open Error Notebook"
    },
    {
      level: 9,
      title: "Rapid Revision & Flashcards",
      desc: "Formula handbook, organic reaction mechanism roadmaps, and spaced repetition Leitner flashcards.",
      tabId: "flashcards",
      cta: "Review Flashcards"
    },
    {
      level: 10,
      title: "Exam-Day Peak Execution",
      desc: "Admit card verification, dress code compliance, time pacing strategy, and calm mental readiness.",
      tabId: "exam-day",
      cta: "Exam Day Protocol"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: '0-to-NEET 10-Level Roadmap' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white shadow-xl space-y-3 border border-emerald-900/50">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Proven Step-by-Step Medical Entrance Journey</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          ZERO-TO-NEET 10-LEVEL ROADMAP
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          From the day you decide to prepare for NEET through to exam-day execution. Follow the progressive 11 stages to systematically reach 680-720 marks.
        </p>
      </div>

      <div className="space-y-4">
        {roadmapLevels.map((lvl) => (
          <div
            key={lvl.level}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-500/60 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-black text-sm flex items-center justify-center shrink-0">
                L{lvl.level}
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Level {lvl.level}: {lvl.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                  {lvl.desc}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab(lvl.tabId)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-brand-600 hover:text-white dark:bg-slate-800 dark:hover:bg-brand-600 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-all shrink-0"
            >
              <span>{lvl.cta}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
