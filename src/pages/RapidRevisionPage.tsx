import React from 'react';
import { BrainCircuit, Atom, FlaskConical, Dna, AlertTriangle, Bookmark, Sparkles, ChevronRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import formulasData from '../data/formulas/physics-formulas.json';
import reactionsData from '../data/reactions/organic-reactions.json';
import flashcardsData from '../data/flashcards/flashcards.json';
import { useUserProgress } from '../context/UserProgressContext';

interface RapidRevisionPageProps {
  onNavigateHome: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const RapidRevisionPage: React.FC<RapidRevisionPageProps> = ({ onNavigateHome, onNavigateTab }) => {
  const { mistakes, bookmarks } = useUserProgress();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: 'NEET Rapid Revision Hub' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 text-white shadow-xl space-y-3 border border-orange-900/50">
        <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4" />
          <span>Last-Mile Rapid Knowledge Consolidation</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          NEET RAPID REVISION HUB
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          High-yield formula quick-reference, organic reaction cheatsheets, inorganic periodic tables, and your personal mistake repository for final 48-hour exam prep.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Physics Formulae Card */}
        <div
          onClick={() => onNavigateTab('formula-book')}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 cursor-pointer hover:border-blue-500 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold">
            <Atom className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600">
            Physics Formula Sheet ({formulasData.length} Core Formulae)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Units, valid boundary conditions, and pitfalls in mechanics, electricity, and optics.
          </p>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <span>Open Formula Book</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Chemistry Reactions Card */}
        <div
          onClick={() => onNavigateTab('reaction-map')}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 cursor-pointer hover:border-teal-500 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400 flex items-center justify-center font-bold">
            <FlaskConical className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 group-hover:text-teal-600">
            Organic Reaction Maps ({reactionsData.length} Key Pathways)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Aldol, Cannizzaro, HVZ, Reimer-Tiemann, and reagent conversion shortcuts.
          </p>
          <div className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
            <span>Open Reaction Map</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Biology NCERT Facts */}
        <div
          onClick={() => onNavigateTab('flashcards')}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 cursor-pointer hover:border-purple-500 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 group-hover:text-purple-600">
            Biology High-Yield Flashcards ({flashcardsData.length} Cards)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Direct NCERT facts, scientist dates, examples, and anatomical structures.
          </p>
          <div className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
            <span>Start Revision Drill</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Personal Error Notebook */}
        <div
          onClick={() => onNavigateTab('error-notebook')}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 cursor-pointer hover:border-rose-500 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 group-hover:text-rose-600">
            Personal Error Notebook ({mistakes.length} Logged Traps)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Review questions you previously got wrong so you do not repeat errors on exam day.
          </p>
          <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
            <span>Inspect Mistakes</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Saved Bookmarks */}
        <div
          onClick={() => onNavigateTab('practice')}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 cursor-pointer hover:border-amber-500 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center font-bold">
            <Bookmark className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 group-hover:text-amber-600">
            Bookmarked Questions ({bookmarks.length} Saved)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Challenging questions you flagged for a second look during practice.
          </p>
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <span>Review Bookmarks</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
