import React, { useState } from 'react';
import { Building2, ExternalLink, ShieldCheck, Search, Filter } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import collegesData from '../data/colleges/medical-colleges.json';
import { MedicalCollege } from '../types';

interface CollegeDatabasePageProps {
  onNavigateHome: () => void;
}

export const CollegeDatabasePage: React.FC<CollegeDatabasePageProps> = ({ onNavigateHome }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = (collegesData as MedicalCollege[]).filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: 'Medical Colleges Directory' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-950 text-white shadow-xl space-y-3 border border-brand-900/50">
        <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Factual NMC-Registered College Information</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          PREMIER MEDICAL INSTITUTIONS DIRECTORY
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Official factual registry of MBBS intake seats, approximate government tuition fees, and admission counselling authorities.
        </p>
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="font-bold text-slate-400 mr-1">Type:</span>
          {(['all', 'Central / AIIMS', 'State Government'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                typeFilter === t ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {t === 'all' ? 'All Institutions' : t}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by college, city, or state..."
            className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((clg) => (
          <div
            key={clg.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-brand-500/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  {clg.type} • Estd. {clg.establishedYear}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {clg.city}, {clg.state}
                </span>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-snug">
                {clg.name}
              </h3>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Official MBBS Seats:</span>
                  <span className="font-extrabold text-brand-700 dark:text-brand-300">{clg.totalMbbsSeats} Seats</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Approx. Annual Fee:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{clg.approxGovtFeePerYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Counselling Route:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{clg.counsellingAuthority}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">Verified: {clg.lastVerified}</span>
              <a
                href={clg.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <span>Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
