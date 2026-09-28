import React from 'react';
import { Award, CheckCircle2, ShieldCheck, XCircle, AlertTriangle, FileText, UserCheck, Calendar } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import currentExamData from '../data/exams/neet-ug-current.json';

interface EligibilityPageProps {
  onNavigateHome: () => void;
}

export const EligibilityPage: React.FC<EligibilityPageProps> = ({ onNavigateHome }) => {
  const { language } = useLanguage();
  const elig = currentExamData.eligibility;

  const currentRules = [
    {
      title: "Minimum Age Requirement",
      rule: elig.minimumAge,
      detail: "Must have completed 17 years on or before 31st December of the admission year. For NEET 2026, born on or before 31.12.2009.",
      status: "Active"
    },
    {
      title: "Upper Age Limit",
      rule: elig.upperAgeLimit,
      detail: "National Medical Commission (NMC) abolished the upper age ceiling following Hon'ble Supreme Court directives. Candidates of any age above 17 are eligible.",
      status: "Abolished / No Limit"
    },
    {
      title: "Qualifying Examination (Class 12)",
      rule: elig.qualification,
      detail: "Candidates appearing in 10+2 are also eligible (provisional). Open School (NIOS) and Private candidates are also eligible per latest court rulings.",
      status: "Active"
    },
    {
      title: "Mandatory Core Subjects",
      rule: elig.mandatorySubjects.join(", "),
      detail: "Physics, Chemistry, Biology/Biotechnology, and English as core/elective subjects in Class 11 and 12.",
      status: "Active"
    },
    {
      title: "Minimum Qualifying Aggregate Marks in PCB",
      rule: `General/EWS: ${elig.minMarksGeneral} | Reserved: ${elig.minMarksReserved}`,
      detail: "Aggregate marks in Physics + Chemistry + Biology/Biotechnology combined in Class 12 board examination. Pass marks in English are mandatory.",
      status: "Active"
    },
    {
      title: "Number of Attempts Allowed",
      rule: elig.attempts,
      detail: "There is no cap or limit on the number of attempts for NEET-UG as long as minimum age criteria are satisfied.",
      status: "Unlimited"
    },
    {
      title: "Eligible Nationalities",
      rule: elig.nationality.join(", "),
      detail: "Indian Citizens, Non-Resident Indians (NRIs), Overseas Citizens of India (OCIs), Persons of Indian Origin (PIOs), and Foreign Nationals.",
      status: "Active"
    }
  ];

  const historicalDifferences = [
    {
      item: "Upper Age Limit",
      past: "Previously 25 years for Unreserved and 30 years for SC/ST/OBC (often challenged in courts).",
      current: "Now permanently REMOVED by NMC letter dated 09.03.2022 and Supreme Court order. No upper age limit."
    },
    {
      item: "Biology as Additional Subject",
      past: "Earlier students with Biology as an additional subject were initially barred by MCI.",
      current: "Now ELIGIBLE per NMC decision dated 22.11.2023. Candidates taking Biology as additional/optional subject after Class 12 are permitted."
    },
    {
      item: "Open School (NIOS) Candidates",
      past: "NIOS / Private state open school candidates faced restrictions in previous bulletins.",
      current: "Now fully ELIGIBLE to write NEET-UG."
    },
    {
      item: "Attempt Limit",
      past: "A 3-attempt limit was proposed in 2017 but quickly withdrawn.",
      current: "Unlimited attempts allowed."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'पात्रता नियम' : 'Eligibility Rules' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Sourced from National Medical Commission (NMC) & NTA Official Regulations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          NEET-UG ELIGIBILITY CRITERIA ({currentExamData.year})
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Official statutory criteria prescribed under the National Medical Commission Act, 2019 and latest Gazetted orders.
        </p>
      </div>

      {/* Current Official Rules Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Current Active Eligibility Rules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {rule.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {rule.status}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-semibold text-xs text-brand-700 dark:text-brand-300">
                {rule.rule}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {rule.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Distinguishing Current Rules from Historical Rules */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Current Rules vs. Historical Rules (Avoid Outdated Coaching Myths)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Many websites continue to quote discarded rules. Here is the verified official legal comparison:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 uppercase text-slate-400 text-xs">
                <th className="py-3 px-4 font-bold">Eligibility Parameter</th>
                <th className="py-3 px-4 font-bold text-rose-500">Historical Discarded Rule</th>
                <th className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">Current NMC Law</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {historicalDifferences.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                    {item.item}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 line-through">
                    {item.past}
                  </td>
                  <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200 font-semibold">
                    {item.current}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
