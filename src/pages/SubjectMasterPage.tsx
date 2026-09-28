import React, { useState } from 'react';
import {
  Atom,
  FlaskConical,
  Dna,
  BookOpen,
  Target,
  Sparkles,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Filter
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import { ChapterSyllabus, Subject } from '../types';
import physicsChapters from '../data/syllabus/physics.json';
import chemistryChapters from '../data/syllabus/chemistry.json';
import biologyChapters from '../data/syllabus/biology.json';

interface SubjectMasterPageProps {
  subject: Subject;
  onNavigateHome: () => void;
  onSelectChapter: (chapter: ChapterSyllabus) => void;
  onStartChapterPractice: (chapterName: string) => void;
}

export const SubjectMasterPage: React.FC<SubjectMasterPageProps> = ({
  subject,
  onNavigateHome,
  onSelectChapter,
  onStartChapterPractice
}) => {
  const { language } = useLanguage();
  const [selectedClass, setSelectedClass] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const chaptersMap: Record<Subject, ChapterSyllabus[]> = {
    Physics: physicsChapters as ChapterSyllabus[],
    Chemistry: chemistryChapters as ChapterSyllabus[],
    Biology: biologyChapters as ChapterSyllabus[]
  };

  const allChapters = chaptersMap[subject] || [];

  const filteredChapters = allChapters.filter((ch) => {
    const matchesClass = selectedClass === 'all' || ch.classLevel === selectedClass;
    const matchesQuery =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ch.nameHi && ch.nameHi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ch.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesQuery;
  });

  const subjectMeta = {
    Physics: {
      color: "from-blue-600 to-indigo-600",
      accent: "text-blue-600 dark:text-blue-400",
      bgLight: "bg-blue-50 dark:bg-blue-950/30",
      icon: Atom,
      marks: "180 Marks (45 to attempt out of 50)",
      desc: "Formulae, conceptual problem solving, graph interpretation, and NMC practical experiments."
    },
    Chemistry: {
      color: "from-teal-600 to-emerald-600",
      accent: "text-teal-600 dark:text-teal-400",
      bgLight: "bg-teal-50 dark:bg-teal-950/30",
      icon: FlaskConical,
      marks: "180 Marks (45 to attempt out of 50)",
      desc: "Physical Chemistry calculations, Inorganic NCERT periodic tables/coordination, and Organic mechanisms."
    },
    Biology: {
      color: "from-emerald-600 to-teal-700",
      accent: "text-emerald-600 dark:text-emerald-400",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
      icon: Dna,
      marks: "360 Marks (90 to attempt out of 100)",
      desc: "50% of the entire NEET paper. Pure NCERT line-by-line mastery, high-yield biological facts, and diagrams."
    }
  };

  const meta = subjectMeta[subject];
  const Icon = meta.icon;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[
          { label: 'Syllabus', onClick: onNavigateHome },
          { label: `NEET ${subject}` }
        ]}
        onNavigateHome={onNavigateHome}
      />

      {/* Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${meta.color} text-white shadow-xl space-y-3`}>
        <div className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-wider">
          <Icon className="w-5 h-5" />
          <span>NEET-UG Official Subject Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          NEET {subject.toUpperCase()} MASTER
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
          {meta.desc}
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm font-bold">
            {meta.marks}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm font-semibold">
            {allChapters.length} Syllabus Chapters
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Class Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedClass('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedClass === 'all'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Classes ({allChapters.length})
          </button>
          <button
            onClick={() => setSelectedClass(11)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedClass === 11
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Class 11 ({allChapters.filter(c => c.classLevel === 11).length})
          </button>
          <button
            onClick={() => setSelectedClass(12)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedClass === 12
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Class 12 ({allChapters.filter(c => c.classLevel === 12).length})
          </button>
        </div>

        {/* Search inside subject */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${subject} chapters or topics...`}
            className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredChapters.map((chapter) => (
          <div
            key={chapter.id}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/60 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              {/* Unit & Class Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Class {chapter.classLevel} • {chapter.unit}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>~{chapter.avgQuestionsPerYear} Qs/yr ({chapter.weightagePercentage}%)</span>
                </div>
              </div>

              {/* Chapter Title */}
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 hover:text-brand-600 cursor-pointer"
                  onClick={() => onSelectChapter(chapter)}
                >
                  {language === 'hi' ? chapter.nameHi : chapter.name}
                </h3>
                <p className="text-xs text-slate-400 italic">
                  {chapter.ncertBook}
                </p>
              </div>

              {/* NMC Specific Notes if present */}
              {chapter.nmcNotes && (
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>NMC Guidance:</strong> {chapter.nmcNotes}
                  </div>
                </div>
              )}

              {/* Topics Pills */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">High-Yield Topics:</span>
                <div className="flex flex-wrap gap-1.5">
                  {chapter.topics.slice(0, 4).map((t, tidx) => (
                    <span
                      key={tidx}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                        t.isNmcAdded
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {language === 'hi' ? t.nameHi : t.name}
                      {t.isNmcAdded && " (NMC Added)"}
                    </span>
                  ))}
                  {chapter.topics.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{chapter.topics.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectChapter(chapter)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-950/50 dark:hover:bg-brand-900 dark:text-brand-300 transition-colors flex items-center gap-1"
              >
                <span>Chapter Engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onStartChapterPractice(chapter.name)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1"
              >
                <Target className="w-3.5 h-3.5 text-brand-500" />
                <span>Practice (30 Qs)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
