import React from 'react';
import { Sparkles, AlertCircle, BookOpen, Clock, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import awarenessArticles from '../data/awareness/medical-science-awareness.json';
import { useLanguage } from '../context/LanguageContext';

interface MedicalScienceAwarenessPageProps {
  onNavigateHome: () => void;
}

export const MedicalScienceAwarenessPage: React.FC<MedicalScienceAwarenessPageProps> = ({
  onNavigateHome
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'चिकित्सा एवं विज्ञान जागरूकता' : 'Medical & Science Awareness' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-medical-950 text-white shadow-xl space-y-3 border border-teal-900/50">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Curated Enrichment Hub</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          MEDICAL & SCIENCE AWARENESS
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Broaden your clinical horizon with Nobel discoveries, CRISPR advances, and healthcare technology innovations.
        </p>
      </div>

      {/* Mandatory Statutory Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold mb-0.5">STATUTORY SYLLABUS DISCLAIMER:</strong>
          NEET-UG does NOT include generic current affairs as a scored subject. This section is provided strictly for educational enrichment and scientific appreciation. These topics are <strong>NOT part of the NEET examination syllabus</strong> unless explicitly specified in an official NTA/NMC bulletin.
        </div>
      </div>

      {/* Articles Feed */}
      <div className="space-y-6">
        {awarenessArticles.map((art) => (
          <article
            key={art.id}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                {art.category}
              </span>
              <div className="flex items-center gap-3 text-slate-400">
                <span>{art.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {art.readTime}
                </span>
              </div>
            </div>

            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {language === 'hi' ? art.titleHi : art.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-medium italic">
              {art.summary}
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
              {art.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Core Takeaways
              </h4>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                {art.keyTakeaways.map((takeaway, tidx) => (
                  <li key={tidx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Source: <strong className="text-slate-600 dark:text-slate-300">{art.source}</strong></span>
              <span className="text-[10px] text-amber-600 font-semibold">{art.disclaimer}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
