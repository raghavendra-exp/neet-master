import React, { useState } from 'react';
import { Dna, CheckCircle2, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import diagramsData from '../data/diagrams/diagram-data.json';
import { useLanguage } from '../context/LanguageContext';

interface DiagramEnginePageProps {
  onNavigateHome: () => void;
}

export const DiagramEnginePage: React.FC<DiagramEnginePageProps> = ({ onNavigateHome }) => {
  const { language } = useLanguage();
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(diagramsData[0].id);
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);

  const activeDiagram = diagramsData.find(d => d.id === selectedDiagramId) || diagramsData[0];
  const activeLabel = activeDiagram.labels.find(l => l.id === selectedLabelId);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'चित्र व्याख्या एवं संरचना' : 'Biology Diagram Engine' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white shadow-xl space-y-3 border border-emerald-900/50">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Dna className="w-4 h-4" />
          <span>Interactive Anatomical & Physiological Vector Models</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          BIOLOGY DIAGRAM ENGINE
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Interactive labeling and anatomical function mapping for the Human Heart, Nephron, Neuron, and cellular organelles. Click any part to inspect physiological roles.
        </p>
      </div>

      {/* Diagram Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {diagramsData.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              setSelectedDiagramId(d.id);
              setSelectedLabelId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedDiagramId === d.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {language === 'hi' ? d.titleHi : d.title}
          </button>
        ))}
      </div>

      {/* Interactive Diagram Canvas & Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Diagram Surface */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {language === 'hi' ? activeDiagram.titleHi : activeDiagram.title}
              </h2>
              <p className="text-xs text-slate-500">{activeDiagram.chapter}</p>
            </div>
            <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
              Click any hot-spot to inspect
            </span>
          </div>

          {/* Stylized Interactive SVG Canvas */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
            {/* SVG Illustration Vector Mockup */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-4 pointer-events-none opacity-80">
              {activeDiagram.id === 'diag-heart' && (
                <path
                  d="M50 85 C20 60 10 40 20 25 C30 10 45 20 50 30 C55 20 70 10 80 25 C90 40 80 60 50 85 Z"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="2 1"
                />
              )}
              {activeDiagram.id === 'diag-nephron' && (
                <path
                  d="M25 25 Q35 15 45 30 T55 60 Q45 85 40 85 T35 60 Q45 25 75 25 L85 85"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3"
                />
              )}
              {activeDiagram.id === 'diag-neuron' && (
                <path
                  d="M15 35 Q25 45 40 45 L75 45 Q85 55 85 65"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />
              )}
            </svg>

            {/* Interactive Pins */}
            {activeDiagram.labels.map((lbl) => {
              const isSelected = lbl.id === selectedLabelId;
              return (
                <button
                  key={lbl.id}
                  onClick={() => setSelectedLabelId(lbl.id)}
                  style={{ left: `${lbl.x}%`, top: `${lbl.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-brand-600 text-white scale-110 ring-4 ring-brand-500/30'
                      : 'bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 hover:scale-105 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-brand-500'}`}></span>
                  <span>{language === 'hi' ? lbl.nameHi : lbl.name}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            {activeDiagram.description}
          </p>
        </div>

        {/* Right 1 Col: Anatomy Function Inspection Card */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Anatomical Details & Function</span>
            </h3>

            {activeLabel ? (
              <div className="space-y-3 animate-in fade-in">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 uppercase">
                  Structure
                </span>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  {language === 'hi' ? activeLabel.nameHi : activeLabel.name}
                </h4>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1">Function & Significance:</strong>
                  {activeLabel.function}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                <p>Click any numbered structure pin on the canvas to inspect its physiological function.</p>
              </div>
            )}
          </div>

          {/* High-Yield NCERT Facts on this Diagram */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400">
              NCERT Exam Facts
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {activeDiagram.highYieldNcrtFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
