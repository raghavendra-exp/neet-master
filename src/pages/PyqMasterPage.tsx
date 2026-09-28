import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Award,
  Filter,
  BarChart2,
  Calendar,
  Layers,
  Sparkles,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuestionCard } from '../components/QuestionCard';
import { verifiedPyqs, allQuestions } from '../data/questions';
import { useLanguage } from '../context/LanguageContext';
import { Subject } from '../types';

interface PyqMasterPageProps {
  onNavigateHome: () => void;
}

export const PyqMasterPage: React.FC<PyqMasterPageProps> = ({ onNavigateHome }) => {
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'questions' | 'trends' | 'chapters' | 'repeats'>('trends');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  const pyqYears = [2025, 2024, 2023, 2022, 2021, 2020];

  // Frequency analysis
  const chapterFrequency = useMemo(() => {
    const counts: Record<string, { count: number; subject: Subject }> = {};
    verifiedPyqs.forEach(q => {
      if (!counts[q.chapter]) {
        counts[q.chapter] = { count: 0, subject: q.subject };
      }
      counts[q.chapter].count++;
    });

    return Object.entries(counts)
      .map(([chapter, data]) => ({ chapter, count: data.count, subject: data.subject }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const filteredPyqs = useMemo(() => {
    return verifiedPyqs.filter(q => {
      const matchSub = selectedSubject === 'all' || q.subject === selectedSubject;
      const matchYr = selectedYear === 'all' || q.pyqYear === selectedYear;
      return matchSub && matchYr;
    });
  }, [selectedSubject, selectedYear]);

  // Repeated conceptual themes
  const repeatedThemes = [
    { theme: "Bohr Engine & Rydberg Formula", subject: "Physics", frequency: "Tested 6 out of 6 past years", detail: "Shortest vs longest wavelength of Lyman and Balmer spectral series." },
    { theme: "Rolling Motion on Incline (k²/R²)", subject: "Physics", frequency: "Tested 5 out of 6 past years", detail: "Acceleration and kinetic energy distribution of solid sphere vs disc vs ring." },
    { theme: "Cannizzaro Reaction vs Aldol Condensation", subject: "Chemistry", frequency: "Tested 6 out of 6 past years", detail: "Aldehydes with no α-hydrogen (HCHO, Benzaldehyde) disproportionating in 50% NaOH." },
    { theme: "Crystal Field Theory (CFSE & Spin-only μ)", subject: "Chemistry", frequency: "Tested 5 out of 6 past years", detail: "Octahedral t_2g/e_g splitting, spectrochemical series strong vs weak field ligands." },
    { theme: "Genetic Code Properties (AUG, Degeneracy)", subject: "Biology", frequency: "Tested 6 out of 6 past years", detail: "Unambiguous, degenerate, non-overlapping codons; initiator role of AUG." },
    { theme: "Counter-Current Mechanism & Henle's Loop", subject: "Biology", frequency: "Tested 5 out of 6 past years", detail: "Osmolarity gradient from 300 mOsm/L (cortex) to 1200 mOsm/L (inner medulla)." },
    { theme: "Bt Toxin Action Mechanism & Genes", subject: "Biology", frequency: "Tested 5 out of 6 past years", detail: "Protoxin activation by alkaline gut pH; Cry1Ac/Cry2Ab vs Cry1Ab specificity." }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'PYQ मास्टर एवं विश्लेषण' : 'PYQ Master & Analysis' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-900 to-slate-900 text-white shadow-xl space-y-3 border border-amber-800/40">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Strictly Verified Previous Year Questions Only</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          NEET PYQ MASTER & TREND ENGINE
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Statistically analyzed previous year question patterns from 2020 through 2025. Strictly separating verified PYQs from original mock items.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-amber-200">
          <span className="px-3 py-1 rounded-full bg-white/10 font-bold">
            {verifiedPyqs.length} Verified PYQs in Database
          </span>
          <span>•</span>
          <span>Chapter-wise Weightages & Repeat Concept Matrices</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'trends', label: '📊 PYQ Trends & Distribution' },
          { id: 'chapters', label: '🔥 High-Yield Chapter Frequency' },
          { id: 'repeats', label: '🔁 Repeated Concepts & Themes' },
          { id: 'questions', label: `📝 Browse All PYQs (${filteredPyqs.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Trends & Distribution */}
      {activeTab === 'trends' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-blue-500" />
              <span>Physics PYQ Distribution</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Consistently 40-45% Mechanics & Electrodynamics, 20% Optics & Modern Physics, and 15% Thermodynamics/SHM.
            </p>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-xs font-semibold text-blue-800 dark:text-blue-300">
              High Yield: Mechanics (8 Qs), Current & Magnetism (7 Qs), Optics (5 Qs), Modern Physics (4 Qs).
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-teal-500" />
              <span>Chemistry PYQ Distribution</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Physical Chemistry numericals (35%), Inorganic NCERT tables & coordination (35%), Organic mechanisms (30%).
            </p>
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-xs font-semibold text-teal-800 dark:text-teal-300">
              High Yield: Chemical Bonding (4 Qs), Coordination (4 Qs), GOC & Carbonyls (7 Qs), Equilibrium (4 Qs).
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-500" />
              <span>Biology PYQ Distribution</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              90-95% direct NCERT text extraction. High concentration in Genetics & Molecular Basis (12-14 Qs) and Human Physiology (10-12 Qs).
            </p>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              High Yield: Genetics & Molecular (12 Qs), Human Physiology (11 Qs), Reproduction (9 Qs), Cell (9 Qs).
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Chapter Frequency */}
      {activeTab === 'chapters' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <span>Chapter Frequency Ranking across Available PYQs</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-xs">
                  <th className="py-3 px-3 font-bold">Rank</th>
                  <th className="py-3 px-3 font-bold">Chapter Name</th>
                  <th className="py-3 px-3 font-bold">Subject</th>
                  <th className="py-3 px-3 font-bold text-right">PYQ Questions Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {chapterFrequency.map((cf, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-slate-400">#{idx + 1}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">{cf.chapter}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {cf.subject}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-brand-600 dark:text-brand-400">
                      {cf.count} Questions
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Repeated Concepts */}
      {activeTab === 'repeats' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Frequently Repeated Concepts (Guaranteed Focus Areas)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repeatedThemes.map((r, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {r.subject}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{r.frequency}</span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  {r.theme}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {r.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Browse All PYQs */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Subject:</span>
              {(['all', 'Physics', 'Chemistry', 'Biology'] as const).map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    selectedSubject === sub ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {sub === 'all' ? 'All' : sub}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Year:</span>
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  selectedYear === 'all' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                All Years
              </button>
              {pyqYears.map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    selectedYear === yr ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredPyqs.map((q, idx) => (
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
    </div>
  );
};
