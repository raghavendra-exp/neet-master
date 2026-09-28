import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Star,
  HelpCircle,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import ncertMappingsData from '../data/ncert/ncert-mapping.json';
import { useLanguage } from '../context/LanguageContext';
import { useUserProgress, NcertHighlightType } from '../context/UserProgressContext';

interface NcertMasterPageProps {
  onNavigateHome: () => void;
  onPracticeTopic?: (topicName: string) => void;
}

export const NcertMasterPage: React.FC<NcertMasterPageProps> = ({
  onNavigateHome,
  onPracticeTopic
}) => {
  const { language } = useLanguage();
  const { ncertHighlights, toggleNcertHighlight } = useUserProgress();
  const [selectedClass, setSelectedClass] = useState<number | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'Biology' | 'Chemistry' | 'Physics'>('all');

  const filteredMappings = ncertMappingsData.filter((item) => {
    const matchClass = selectedClass === 'all' || item.ncertClass === selectedClass;
    const matchSubj = selectedSubject === 'all' || item.subject === selectedSubject;
    return matchClass && matchSubj;
  });

  const highlightLabels: Record<NcertHighlightType, { label: string; icon: string; color: string }> = {
    important: { label: "Important", icon: "⭐", color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
    confusing: { label: "Confusing", icon: "🔴", color: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" },
    mastered: { label: "Mastered", icon: "🟢", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
    revise: { label: "Revise", icon: "🟡", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300" },
    bookmark: { label: "Bookmark", icon: "🔖", color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'NCERT मास्टर एवं लाइन-बाय-लाइन' : 'NCERT Master & Line-by-Line' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-900/50 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Line-by-Line NCERT Foundation (Copyright Safe & Fully Mapped)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          NCERT NEET MASTER
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Syllabus-mapped NCERT concepts, page and section cross-references, high-yield statement extractions, and direct links to official NCERT / ePathshala portals.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Class:</span>
          {(['all', 11, 12] as const).map(c => (
            <button
              key={c}
              onClick={() => setSelectedClass(c)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedClass === c ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {c === 'all' ? 'All Classes' : `Class ${c}`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Subject:</span>
          {(['all', 'Biology', 'Chemistry', 'Physics'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedSubject === s ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {s === 'all' ? 'All Subjects' : s}
            </button>
          ))}
        </div>
      </div>

      {/* NCERT Mapped Modules List */}
      <div className="space-y-6">
        {filteredMappings.map((item) => {
          const activeMarks = ncertHighlights[item.id] || [];

          return (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {item.subject} • Class {item.ncertClass}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {item.chapterName} (Ch {item.chapterNumber})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={item.officialEpathshalaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <span>Official ePathshala Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  {item.neetTopic}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Cross-Ref: {item.pageSection}
                </span>
              </div>

              {/* Original Summary */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                {item.summary}
              </p>

              {/* High Yield NCERT Points */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  High-Yield NCERT Statements
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {item.highYieldPoints.map((pt, pidx) => (
                    <li key={pidx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlight System Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 font-semibold mr-1">Mark Tag:</span>
                  {(['important', 'confusing', 'mastered', 'revise', 'bookmark'] as NcertHighlightType[]).map((ht) => {
                    const isSet = activeMarks.includes(ht);
                    const info = highlightLabels[ht];
                    return (
                      <button
                        key={ht}
                        onClick={() => toggleNcertHighlight(item.id, ht)}
                        className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 border transition-all ${
                          isSet
                            ? `${info.color} border-current shadow-sm scale-105`
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{info.icon}</span>
                        <span>{info.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {item.pyqFrequency}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
