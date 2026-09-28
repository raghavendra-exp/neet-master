import React from 'react';
import { Clock, ShieldCheck, CheckSquare, AlertCircle, FileCheck, UserCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import currentExamData from '../data/exams/neet-ug-current.json';

interface ExamDayPageProps {
  onNavigateHome: () => void;
}

export const ExamDayPage: React.FC<ExamDayPageProps> = ({ onNavigateHome }) => {
  const documentsChecklist = [
    "Printed copy of NEET-UG Admit Card downloaded from NTA website (clear colour printout on A4 sheet)",
    "One passport size photograph (same as uploaded on the Online Application Form) for pasting on Attendance Sheet",
    "One postcard size (4\"x6\") colour photograph with white background pasted on Proforma downloaded with Admit Card",
    "Any one valid and original photo identification proof issued by government (PAN card / Driving License / Voter ID / 12th Board Admit Card with photo / Passport / Aadhaar Card / E-Aadhaar)",
    "PwD certificate issued by Competent Authority if claiming relaxation under PwD category",
    "Transparent simple ballpoint pen (though usually provided at exam centre per NTA instructions)"
  ];

  const prohibitedItems = [
    "Any stationery items like textual material, geometry box, pencil box, plastic pouch, calculator, pen drives, log tables, electronic pens/scanners",
    "Any communication device like mobile phones, Bluetooth earphones, microphone, pager, health band, smartwatch",
    "Wallets, goggles, handbags, belt, cap, metallic ornaments/jewelry",
    "Any watch/wristwatch, bracelet, camera",
    "Any eatable items opened or packed (except transparent water bottle and sugar tablets for diabetic candidates)"
  ];

  const timeStrategy = [
    { time: "01:30 PM", action: "Last Entry into Exam Centre", tip: "Gates close strictly at 01:30 PM. No candidate is permitted inside under any circumstances after 01:30 PM." },
    { time: "01:45 PM", action: "Distribution of Test Booklet", tip: "Check that the Test Booklet code matches the Answer Sheet (OMR) code exactly." },
    { time: "02:00 PM", action: "Exam Commences (Biology First Recommended)", tip: "Aim to finish 90 Biology questions in ~45-50 minutes. This builds immense confidence and banks time." },
    { time: "02:50 PM", action: "Chemistry Section (Attempt in ~45 minutes)", tip: "Solve Inorganic & Organic direct recall first, then Physical Chemistry calculations." },
    { time: "03:35 PM", action: "Physics Section (Allocate ~60-70 minutes)", tip: "Carefully read numericals, verify SI units, and solve Level 1-2 standard questions before tricky problems." },
    { time: "04:45 PM", action: "Final OMR Bubble Check & Review (25 mins)", tip: "Ensure Section B choice limit (maximum 10 per subject) is strictly maintained. Verify roll number bubbles." }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: 'Exam-Day Strategy & Official Checklist' }]}
        onNavigateHome={onNavigateHome}
      />

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white shadow-xl space-y-3 border border-indigo-900/50">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Official NTA Examination Instructions Protocol</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          EXAM-DAY PROTOCOL & STRATEGY
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Ground yourself in the official NTA examination day regulations: entry gate timings, mandatory documents, dress code compliances, and optimal 200-minute time allocation.
        </p>
      </div>

      {/* Mandatory Documents Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-brand-600" />
          <span>Mandatory Items to Carry to Exam Centre</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {documentsChecklist.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <CheckSquare className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 200-Minute In-Hall Strategy */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <span>Official Examination Schedule & 200-Minute Pacing Strategy</span>
        </h2>
        <div className="space-y-3">
          {timeStrategy.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <span className="font-mono font-extrabold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-lg">
                  {step.time}
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{step.action}</span>
              </div>
              <p className="text-slate-500 max-w-md sm:text-right">{step.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prohibited Items Warning */}
      <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-3">
        <h3 className="font-bold text-base text-rose-800 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>Strictly Barred Items (NTA Advisory)</span>
        </h3>
        <ul className="space-y-1.5 text-xs text-rose-900 dark:text-rose-200">
          {prohibitedItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-bold">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
