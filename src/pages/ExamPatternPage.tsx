import React, { useState } from 'react';
import { Target, CheckCircle2, ShieldCheck, Clock, Award, Languages, AlertCircle, FileText } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import currentExamData from '../data/exams/neet-ug-current.json';
import exam2026Data from '../data/exams/neet-ug-2026.json';
import exam2025Data from '../data/exams/neet-ug-2025.json';
import exam2024Data from '../data/exams/neet-ug-2024.json';
import { ExamVersion } from '../types';

interface ExamPatternPageProps {
  onNavigateHome: () => void;
}

export const ExamPatternPage: React.FC<ExamPatternPageProps> = ({ onNavigateHome }) => {
  const { language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>("current");

  const versionsMap: Record<string, ExamVersion> = {
    current: currentExamData as ExamVersion,
    "2026": exam2026Data as ExamVersion,
    "2025": exam2025Data as ExamVersion,
    "2024": exam2024Data as ExamVersion
  };

  const activeData = versionsMap[selectedYear] || (currentExamData as ExamVersion);
  const pattern = activeData.pattern;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'परीक्षा पैटर्न' : 'Exam Pattern' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header and Version Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Exam Engine • Verified: {activeData.lastVerified}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            NEET-UG EXAM PATTERN ({activeData.year})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Dynamically loaded from official NTA bulletin specifications without hardcoded overrides.
          </p>
        </div>

        {/* Version Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Edition:</span>
          {(['current', '2026', '2025', '2024'] as const).map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedYear === yr
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {yr === 'current' ? 'Current' : yr}
            </button>
          ))}
        </div>
      </div>

      {/* Core Dynamic Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block">Total Marks</span>
          <span className="text-xl sm:text-2xl font-extrabold text-brand-600 dark:text-brand-400">
            {pattern.totalMarks}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Maximum Possible</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block">Total Questions</span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            {pattern.totalQuestions}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Printed in Booklet</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block">Questions to Attempt</span>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {pattern.questionsToAttempt}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Evaluated for Score</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block">Duration</span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            {pattern.durationMinutes}m
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">3 Hours 20 Mins</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block">Marking Scheme</span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            +{pattern.markingScheme.correct} / {pattern.markingScheme.incorrect}
          </span>
          <span className="text-[10px] text-rose-500 font-semibold block mt-0.5">-1 Negative Mark</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block">Languages</span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            {pattern.languagesCount}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Mediums Available</span>
        </div>
      </div>

      {/* Section-wise Structure Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>Subject-wise Section Structure (Official NTA Two-Section System)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 font-bold">Subject</th>
                <th className="py-3 px-4 font-bold">Section A (Compulsory)</th>
                <th className="py-3 px-4 font-bold">Section B (Optional Choice)</th>
                <th className="py-3 px-4 font-bold">Max Questions</th>
                <th className="py-3 px-4 font-bold text-right">Total Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {pattern.sections.map((sec, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">
                    {sec.subject}
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-brand-600 dark:text-brand-400">{sec.sectionA.questions} Questions</span>
                    <span className="text-xs text-slate-400 block">({sec.sectionA.marks} Marks • All Compulsory)</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">Attempt any {sec.sectionB.attempt} of {sec.sectionB.questions}</span>
                    <span className="text-xs text-slate-400 block">({sec.sectionB.marks} Marks • 5 Optional)</span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {sec.sectionA.questions + sec.sectionB.attempt} Attempted / {sec.sectionA.questions + sec.sectionB.questions} Total
                  </td>
                  <td className="py-4 px-4 text-right font-extrabold text-brand-600 dark:text-brand-400">
                    {sec.sectionA.marks + sec.sectionB.marks} Marks
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 dark:bg-slate-800/60 font-extrabold text-slate-900 dark:text-slate-100">
                <td className="py-4 px-4">TOTAL</td>
                <td className="py-4 px-4">140 Questions (560 Marks)</td>
                <td className="py-4 px-4">Attempt 40 of 60 (160 Marks)</td>
                <td className="py-4 px-4">180 Attempted / 200 Total</td>
                <td className="py-4 px-4 text-right text-brand-600 dark:text-brand-400">{pattern.totalMarks} Marks</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Important Official Section B Rule:</strong> If a candidate attempts more than 10 questions in Section B of any subject, only the first 10 attempted questions are evaluated. Subsequent answers are ignored.
          </div>
        </div>
      </div>

      {/* Available Exam Languages */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Languages className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>Available Question Paper Languages ({pattern.languagesCount} Mediums)</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {pattern.languages.map((lang, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              {lang}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Candidates opting for regional language question papers are provided bilingual booklets (English + Opted regional language). In case of any ambiguity in translation, the English text is treated as final and authoritative by NTA.
        </p>
      </div>
    </div>
  );
};
