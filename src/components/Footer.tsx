import React from 'react';
import { ShieldCheck, ExternalLink, Activity } from 'lucide-react';
import currentExamData from '../data/exams/neet-ug-current.json';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-medical-500 flex items-center justify-center text-white shadow-sm">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg bg-gradient-to-r from-brand-600 to-medical-600 dark:from-brand-400 dark:to-medical-400 bg-clip-text text-transparent">
                NEET MASTER
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Complete NEET-UG Learning, Practice, PYQ, Mock Test & Revision Platform.
              Engineered with 100% adherence to National Testing Agency (NTA), National Medical Commission (NMC), and NCERT rationalized curriculum standards.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Authoritative Exam Engine • Last Verified: {currentExamData.lastVerified}</span>
            </div>
          </div>

          {/* Official Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <a
                  href="https://exams.nta.ac.in/NEET/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <span>NTA NEET Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nmc.org.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <span>National Medical Commission (NMC)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://mcc.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <span>Medical Counselling Committee (MCC)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://ncert.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <span>NCERT Textbooks Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright Policy & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Copyright & Standards
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              NEET Master does not host copyrighted PDFs or proprietary coaching materials. All mock items, summaries, and formula compilations are original educational creations or legitimate public references with full citation.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} NEET MASTER • Open-source, PWA-Ready Medical Entrance Preparation Ecosystem.
        </div>
      </div>
    </footer>
  );
};
