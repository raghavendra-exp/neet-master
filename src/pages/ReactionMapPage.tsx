import React, { useState } from 'react';
import { FlaskConical, Search, ArrowRight, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import reactionsData from '../data/reactions/organic-reactions.json';
import { ChemistryReaction } from '../types';

interface ReactionMapPageProps {
  onNavigateHome: () => void;
}

export const ReactionMapPage: React.FC<ReactionMapPageProps> = ({ onNavigateHome }) => {
  const [search, setSearch] = useState('');

  const filtered = (reactionsData as ChemistryReaction[]).filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.chapter.toLowerCase().includes(search.toLowerCase()) ||
    r.reactant.toLowerCase().includes(search.toLowerCase()) ||
    r.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: 'Chemistry Reaction Map' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 text-white shadow-xl space-y-3 border border-teal-900/50">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
          <FlaskConical className="w-4 h-4" />
          <span>Organic Reaction Mechanism Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          ORGANIC REACTION MAP
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Named reactions, key reagents, specific reaction conditions, intermediates, and high-yield interconversion pathways.
        </p>
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search named reactions, reagents, or mechanisms..."
          className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
      </div>

      <div className="space-y-5">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-teal-500/60 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span className="font-bold text-slate-700 dark:text-slate-300">{r.chapter}</span>
              <span className="text-teal-600 dark:text-teal-400 font-semibold">{r.pyqFrequency}</span>
            </div>

            <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
              {r.name}
            </h3>

            {/* Visual Transformation Pathway */}
            <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Reactant</span>
                <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{r.reactant}</span>
              </div>

              <div className="flex flex-col items-center justify-center px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 shrink-0">
                <span className="text-[10px] font-extrabold text-teal-700 dark:text-teal-300">{r.reagent}</span>
                <div className="flex items-center text-teal-500 my-0.5">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <span className="text-[9px] text-slate-400 italic">{r.condition}</span>
              </div>

              <div className="space-y-1 text-right sm:text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Product</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">{r.product}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Mechanism Type:</span>
                <p className="text-slate-600 dark:text-slate-400">{r.mechanismType}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-200 block">Key Rule / Regioselectivity:</span>
                <p className="text-amber-800 dark:text-amber-300">{r.keyRule}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
