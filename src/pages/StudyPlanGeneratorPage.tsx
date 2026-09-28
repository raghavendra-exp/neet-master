import React, { useState } from 'react';
import { Calendar, GraduationCap, CheckCircle2, Clock, Sparkles, Sliders, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface StudyPlanGeneratorPageProps {
  onNavigateHome: () => void;
}

export const StudyPlanGeneratorPage: React.FC<StudyPlanGeneratorPageProps> = ({ onNavigateHome }) => {
  const [dailyHours, setDailyHours] = useState(8);
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [physicsLevel, setPhysicsLevel] = useState<'weak' | 'average' | 'strong'>('average');
  const [chemLevel, setChemLevel] = useState<'weak' | 'average' | 'strong'>('average');
  const [bioLevel, setBioLevel] = useState<'weak' | 'average' | 'strong'>('strong');
  const [planGenerated, setPlanGenerated] = useState(true);

  // Time allocations dynamically computed
  const bioHours = Math.round(dailyHours * 0.45);
  const phyHours = Math.round(dailyHours * 0.30);
  const chemHours = Math.max(1, dailyHours - bioHours - phyHours);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: 'NEET Study Plan Generator' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-950 via-slate-900 to-indigo-950 text-white shadow-xl space-y-3 border border-brand-900/50">
        <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Personalized Timetable & Revision Algorithm</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          CUSTOM NEET STUDY PLANNER
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Input your daily study bandwidth and current subject proficiencies to generate an optimized daily timetable, weekly review cadence, and full mock testing milestones.
        </p>
      </div>

      {/* Input Parameters Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-brand-600" />
          <span>Your Preparation Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-500 mb-1">
              Daily Study Hours ({dailyHours}h/day)
            </label>
            <input
              type="range"
              min={4}
              max={14}
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>4 hrs</span>
              <span>8 hrs</span>
              <span>14 hrs</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-500 mb-1">Physics Strength</label>
            <select
              value={physicsLevel}
              onChange={(e) => setPhysicsLevel(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              <option value="weak">Needs Improvement (Weak)</option>
              <option value="average">Moderate (Average)</option>
              <option value="strong">Comfortable (Strong)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-500 mb-1">Chemistry Strength</label>
            <select
              value={chemLevel}
              onChange={(e) => setChemLevel(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              <option value="weak">Needs Improvement (Weak)</option>
              <option value="average">Moderate (Average)</option>
              <option value="strong">Comfortable (Strong)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-500 mb-1">Biology Strength</label>
            <select
              value={bioLevel}
              onChange={(e) => setBioLevel(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              <option value="weak">Needs Improvement (Weak)</option>
              <option value="average">Moderate (Average)</option>
              <option value="strong">Targeting 350+ (Strong)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generated Study Schedule */}
      {planGenerated && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[10px] uppercase font-bold text-emerald-600 block">Daily Biology Slot</span>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{bioHours} Hours / Day</div>
              <p className="text-xs text-slate-500">2h NCERT Line-by-Line Reading + 1.5h Chapter MCQ Drills</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[10px] uppercase font-bold text-blue-600 block">Daily Physics Slot</span>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{phyHours} Hours / Day</div>
              <p className="text-xs text-slate-500">1h Formula & Derivation Study + 1.5h Timed Numericals</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[10px] uppercase font-bold text-teal-600 block">Daily Chemistry Slot</span>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{chemHours} Hours / Day</div>
              <p className="text-xs text-slate-500">Inorganic NCERT Tables + Organic Named Reaction Mechanisms</p>
            </div>
          </div>

          {/* Daily 24h Rhythm Model */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-600" />
              <span>Recommended Daily NEET Master Rhythm ({dailyHours} Active Hours)</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
                <span className="font-bold text-brand-600 w-24 shrink-0">06:30 - 08:30</span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Slot 1: Biology NCERT Deep Read</strong>
                  <p className="text-slate-500 text-xs mt-0.5">High alertness morning window. Read 1 chapter thoroughly with NCERT highlight system.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
                <span className="font-bold text-blue-600 w-24 shrink-0">09:30 - 12:30</span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Slot 2: Physics Concept & Numerical Solving</strong>
                  <p className="text-slate-500 text-xs mt-0.5">Focus on mechanics, kinematics, or electrodynamics problem sets (30 questions minimum).</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
                <span className="font-bold text-teal-600 w-24 shrink-0">14:00 - 16:30</span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Slot 3: Chemistry Focus (Physical / Organic / Inorganic)</strong>
                  <p className="text-slate-500 text-xs mt-0.5">Reagent charts, reaction mechanisms, or equilibrium numerical practice.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
                <span className="font-bold text-amber-600 w-24 shrink-0">17:30 - 19:30</span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Slot 4: Verified PYQs & Timed Mixed Drill</strong>
                  <p className="text-slate-500 text-xs mt-0.5">Simulate 40-50 mixed questions under 45-minute strict timer.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
                <span className="font-bold text-purple-600 w-24 shrink-0">21:00 - 22:30</span>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Slot 5: Spaced Flashcards & Error Notebook Reflection</strong>
                  <p className="text-slate-500 text-xs mt-0.5">Review today's mistakes in the Error Notebook and complete daily spaced repetition flashcards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
