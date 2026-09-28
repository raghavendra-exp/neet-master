import React from 'react';
import {
  Activity,
  Search,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  BookOpen,
  Award,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import currentExamData from '../data/exams/neet-ug-current.json';

interface NavbarProps {
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onToggleSidebar,
  isSidebarOpen,
  activeTab,
  setActiveTab
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, setTheme, isDark } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-medical-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand-600 to-medical-600 dark:from-brand-400 dark:to-medical-400 bg-clip-text text-transparent">
                  NEET MASTER
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-300">
                  {currentExamData.year}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Complete NEET-UG Preparation Platform
              </p>
            </div>
          </button>
        </div>

        {/* Center: Live countdown / official exam pill badge */}
        <div
          onClick={() => setActiveTab('live-status')}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium cursor-pointer hover:bg-emerald-100 transition-colors"
          title="Click to view Live NEET Center"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>NEET-UG {currentExamData.year}: {currentExamData.examDate}</span>
          <span className="text-[10px] opacity-75">| Verified: {currentExamData.lastVerified}</span>
        </div>

        {/* Right Actions: Search, Language, Theme */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs sm:text-sm font-medium transition-colors"
            title="Global Search (Press / or click)"
          >
            <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Search (खोजें)...</span>
            <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-400">
              /
            </kbd>
          </button>

          {/* Hindi / English Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
            title="Switch Language (हिंदी / English)"
          >
            <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
