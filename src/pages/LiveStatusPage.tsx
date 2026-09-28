import React from 'react';
import {
  Bell,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Building2,
  RefreshCw
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import updatesData from '../data/updates/neet-updates.json';
import currentExamData from '../data/exams/neet-ug-current.json';

interface LiveStatusPageProps {
  onNavigateHome: () => void;
}

export const LiveStatusPage: React.FC<LiveStatusPageProps> = ({ onNavigateHome }) => {
  const { language } = useLanguage();

  const lifecycleStages = [
    { name: "Notification", status: "Upcoming", date: currentExamData.notificationDate, desc: "Information Bulletin release by NTA" },
    { name: "Application Window", status: "Upcoming", date: `${currentExamData.application.startDate} - ${currentExamData.application.endDate}`, desc: "Online form submission & fee payment" },
    { name: "Correction Window", status: "Upcoming", date: currentExamData.application.correctionWindow, desc: "Fields correction in uploaded application" },
    { name: "Admit Card", status: "Upcoming", date: "April 2026 (Expected)", desc: "City intimation & admit card download" },
    { name: "Exam Date", status: "Scheduled", date: currentExamData.examDate, desc: "02:00 PM to 05:20 PM IST (Pen & Paper Mode)" },
    { name: "Provisional Answer Key", status: "Upcoming", date: "May 2026", desc: "OMR display and answer key challenge" },
    { name: "Result & All India Ranks", status: "Upcoming", date: "June 2026", desc: "Scorecard download & qualifying percentile" },
    { name: "Counselling (MCC & State)", status: "Upcoming", date: "July - Sept 2026", desc: "15% AIQ and 85% State Quota seat allotment" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'नीट लाइव केंद्र' : 'Live NEET Center' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white space-y-3 border border-emerald-800/40 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Examination Status Hub</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          NEET-UG CURRENT STATUS & UPDATES
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Real-time tracking of NTA notifications, application schedules, eligibility advisories, answer keys, results, and MCC counselling circulars.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            Verified against Official Sources: {currentExamData.lastVerified}
          </span>
          <span>•</span>
          <a
            href={currentExamData.officialSource}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-300 hover:text-white underline"
          >
            <span>NTA Portal (exams.nta.ac.in)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Lifecycle Timeline Track */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>NEET-UG {currentExamData.year} Official Milestone Timeline</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {lifecycleStages.map((stage, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Step 0{idx + 1}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  stage.status === 'Scheduled'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {stage.status}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {stage.name}
              </h3>
              <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                {stage.date}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Circulars & Verified Notices List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>Verified Official Notices & Bulletins</span>
        </h2>

        <div className="space-y-3">
          {updatesData.map((u) => (
            <div
              key={u.id}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 uppercase">
                    {u.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {u.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Verified: <strong className="text-slate-700 dark:text-slate-300">{u.lastVerified}</strong></span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                {language === 'hi' ? u.titleHi : u.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'hi' ? u.summaryHi : u.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-500">
                  Official Source: <strong className="text-slate-700 dark:text-slate-300">{u.officialSource}</strong>
                </span>

                <a
                  href={u.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <span>Verify on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
