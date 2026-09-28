import React, { useState } from 'react';
import { Atom, Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import formulasData from '../data/formulas/physics-formulas.json';
import { PhysicsFormula } from '../types';

interface FormulaBookPageProps {
  onNavigateHome: () => void;
}

export const FormulaBookPage: React.FC<FormulaBookPageProps> = ({ onNavigateHome }) => {
  const [search, setSearch] = useState('');

  const filtered = (formulasData as PhysicsFormula[]).filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.chapter.toLowerCase().includes(search.toLowerCase()) ||
    f.formula.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: 'Physics Formula Book' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl space-y-3 border border-blue-900/50">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Atom className="w-4 h-4" />
          <span>Physics Formula Handbook</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          PHYSICS FORMULA ENGINE
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Master the exact conditions, SI units, variables, common student traps, and associated PYQ occurrences for every high-yield formula.
        </p>
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search formulas by name, chapter, or expression..."
          className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((f) => (
          <div
            key={f.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-500/60 transition-all"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-slate-700 dark:text-slate-300">{f.chapter}</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{f.relatedPyq}</span>
            </div>

            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
              {f.name}
            </h3>

            {/* Formula Block */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-center font-mono text-base sm:text-lg font-black text-blue-900 dark:text-blue-200">
              {f.formula}
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <strong className="text-slate-800 dark:text-slate-100">Variables: </strong>
                {f.variables}
              </div>
              <div>
                <strong className="text-slate-800 dark:text-slate-100">SI Units: </strong>
                {f.siUnits}
              </div>
              <div>
                <strong className="text-slate-800 dark:text-slate-100">Valid Conditions: </strong>
                {f.conditions}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong>Common Trap: </strong>{f.commonMistake}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
