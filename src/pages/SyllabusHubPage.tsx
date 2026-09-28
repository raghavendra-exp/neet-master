import React from 'react';
import { Layers, Atom, FlaskConical, Dna, ArrowRight, ShieldCheck, AlertCircle, BookOpen } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Subject } from '../types';
import physicsChapters from '../data/syllabus/physics.json';
import chemistryChapters from '../data/syllabus/chemistry.json';
import biologyChapters from '../data/syllabus/biology.json';
import { useLanguage } from '../context/LanguageContext';

interface SyllabusHubPageProps {
  onNavigateHome: () => void;
  onSelectSubject: (subject: Subject) => void;
}

export const SyllabusHubPage: React.FC<SyllabusHubPageProps> = ({
  onNavigateHome,
  onSelectSubject
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'संपूर्ण पाठ्यक्रम' : 'Complete Syllabus Engine' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-medical-950 text-white shadow-xl space-y-3 border border-brand-900/50">
        <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>NMC Revised Curriculum Harmonization</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          NEET-UG COMPLETE SYLLABUS ENGINE
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Authoritative mapping of Class 11 and Class 12 NCERT curriculum across Physics, Chemistry, and Biology. Clearly distinguishing NMC added topics from discarded units.
        </p>
      </div>

      {/* NMC Revised Highlights Box */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 space-y-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Summary of NMC Syllabus Rationalization</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-amber-950 dark:text-amber-200">
          <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl space-y-1">
            <strong>Physics:</strong> Added practical physics (least count of screw gauge, vernier calipers, meter bridge). Removed Doppler effect and Van de Graaff generator.
          </div>
          <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl space-y-1">
            <strong>Chemistry:</strong> Removed Solid State, Surface Chemistry, Hydrogen, s-Block, Metallurgy, Polymers, Everyday Chemistry. Focused deeply on GOC, Bonding, and Solutions.
          </div>
          <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl space-y-1">
            <strong>Biology:</strong> Added plant families (Malvaceae, Cruciferae, Compositae, Gramineae) and Frog & Cockroach. Removed Digestion, Mineral Nutrition, and Transport.
          </div>
        </div>
      </div>

      {/* 3 Main Subject Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Physics */}
        <div
          onClick={() => onSelectSubject('Physics')}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold">
              <Atom className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-600 block">180 Marks • 50 Questions</span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600">
                Physics Master
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {physicsChapters.length} Chapters • Kinematics, Laws of Motion, Rotational Dynamics, Electrodynamics, and Optics.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>Explore Physics Chapters</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Chemistry */}
        <div
          onClick={() => onSelectSubject('Chemistry')}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400 flex items-center justify-center font-bold">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-600 block">180 Marks • 50 Questions</span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-teal-600">
                Chemistry Master
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {chemistryChapters.length} Chapters • Physical Calculations, Inorganic NCERT Periodicity, and Organic Mechanisms.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-teal-600">
            <span>Explore Chemistry Chapters</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Biology */}
        <div
          onClick={() => onSelectSubject('Biology')}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Dna className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-600 block">360 Marks • 100 Questions</span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600">
                Biology Master
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {biologyChapters.length} Comprehensive Units • Botany & Zoology. Pure NCERT line-by-line foundation.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>Explore Biology Units</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
