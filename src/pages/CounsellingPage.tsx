import React from 'react';
import { Building2, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import counsellingData from '../data/counselling/counselling-info.json';
import { useLanguage } from '../context/LanguageContext';

interface CounsellingPageProps {
  onNavigateHome: () => void;
}

export const CounsellingPage: React.FC<CounsellingPageProps> = ({ onNavigateHome }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'काउंसलिंग मार्गदर्शिका' : 'Counselling Guide' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white shadow-xl space-y-3 border border-blue-900/50">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory MCC & State Authority Guidelines</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          NEET-UG COUNSELLING PORTAL GUIDE
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Comprehensive informational walkthrough of 15% All India Quota (MCC) and 85% State Quota counselling workflows, mandatory document checklists, and verified authority portals.
        </p>
      </div>

      {/* Statutory Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>{counsellingData.disclaimer}</div>
      </div>

      {/* Central MCC 15% AIQ Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>MCC Central Counselling (15% AIQ & Central/Deemed Institutes)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Authority: {counsellingData.centralCounselling.authority}</p>
          </div>

          <a
            href={counsellingData.centralCounselling.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-1.5"
          >
            <span>Official MCC Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Scope List */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Seats Governed by MCC:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            {counsellingData.centralCounselling.scope.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rounds Breakdown */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sequential Round Structure:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {counsellingData.centralCounselling.rounds.map((r, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 space-y-1 text-xs">
                <div className="font-extrabold text-blue-700 dark:text-blue-300 text-sm">{r.roundName}</div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mandatory Document Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span>Mandatory Verification Documents Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {counsellingData.mandatoryDocuments.map((doc, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* State Authorities Directory */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-brand-600" />
          <span>85% State Quota Authority Directory</span>
        </h2>
        <p className="text-xs text-slate-500">
          State admissions require fulfillment of state-specific domicile and schooling criteria.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {counsellingData.stateCounselling.stateAuthorities.map((sa, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-600">{sa.state}</span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">{sa.authority}</h4>
              </div>
              <a
                href={sa.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-600 hover:underline inline-flex items-center gap-1 font-semibold pt-1"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
