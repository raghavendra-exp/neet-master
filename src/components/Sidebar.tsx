import React from 'react';
import {
  LayoutDashboard,
  Bell,
  BookOpen,
  Atom,
  FlaskConical,
  Dna,
  FileText,
  Target,
  Clock,
  Sparkles,
  BookMarked,
  BrainCircuit,
  Compass,
  Building2,
  Bookmark,
  GraduationCap,
  Layers,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab
}) => {
  const { t, language } = useLanguage();
  const { mistakes, bookmarks } = useUserProgress();

  const navSections = [
    {
      heading: language === 'hi' ? 'मुख्य डैशबोर्ड' : 'MAIN DASHBOARD',
      items: [
        { id: 'home', label: t('nav.home'), icon: LayoutDashboard },
        { id: 'live-status', label: t('nav.updates'), icon: Bell, badge: 'Live' },
        { id: 'exam-pattern', label: language === 'hi' ? 'परीक्षा पैटर्न' : 'Exam Pattern', icon: Target },
        { id: 'eligibility', label: language === 'hi' ? 'पात्रता नियम' : 'Eligibility Rules', icon: Award },
      ]
    },
    {
      heading: language === 'hi' ? 'पाठ्यक्रम एवं विषय' : 'SYLLABUS & SUBJECTS',
      items: [
        { id: 'syllabus', label: t('nav.syllabus'), icon: Layers },
        { id: 'physics', label: t('nav.physics'), icon: Atom, badge: '16 Ch' },
        { id: 'chemistry', label: t('nav.chemistry'), icon: FlaskConical, badge: '15 Ch' },
        { id: 'biology', label: t('nav.biology'), icon: Dna, badge: '9 Units' },
        { id: 'ncert-master', label: t('nav.ncert'), icon: BookOpen },
      ]
    },
    {
      heading: language === 'hi' ? 'अभ्यास एवं मॉक टेस्ट' : 'PRACTICE & MOCKS',
      items: [
        { id: 'practice', label: t('nav.practice'), icon: Target, badge: '1,500+' },
        { id: 'mock-tests', label: t('nav.mock'), icon: Clock },
        { id: 'pyqs', label: t('nav.pyqs'), icon: TrendingUp, badge: '360+ PYQ' },
        { id: 'error-notebook', label: t('nav.errorNotebook'), icon: Bookmark, badge: mistakes.length > 0 ? `${mistakes.length}` : undefined },
      ]
    },
    {
      heading: language === 'hi' ? 'रिवीजन एवं टूल्स' : 'REVISION & TOOLS',
      items: [
        { id: 'formula-book', label: t('nav.formulaBook'), icon: Atom },
        { id: 'reaction-map', label: t('nav.reactionMap'), icon: FlaskConical },
        { id: 'diagrams', label: t('nav.diagrams'), icon: Dna },
        { id: 'flashcards', label: t('nav.flashcards'), icon: Sparkles },
        { id: 'rapid-revision', label: t('nav.rapidRevision'), icon: BrainCircuit },
        { id: 'roadmap', label: t('nav.roadmap'), icon: Compass },
        { id: 'planner', label: t('nav.planner'), icon: GraduationCap },
      ]
    },
    {
      heading: language === 'hi' ? 'पुस्तकालय एवं परामर्श' : 'LIBRARY & GUIDANCE',
      items: [
        { id: 'books', label: t('nav.books'), icon: BookMarked },
        { id: 'awareness', label: t('nav.awareness'), icon: Sparkles },
        { id: 'counselling', label: t('nav.counselling'), icon: Building2 },
        { id: 'colleges', label: t('nav.colleges'), icon: Building2 },
        { id: 'exam-day', label: t('nav.examDay'), icon: Clock, badge: 'D-Day' },
      ]
    }
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.heading}
              </h3>
              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-brand-500/10 text-brand-700 dark:text-brand-300 font-semibold shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-brand-500 text-white'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Profile / Quick Stats card */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-medical-600 text-white flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold opacity-90">
                NEET 2026 Target
              </div>
              <div className="text-sm font-extrabold">720 / 720 Goal</div>
            </div>
            <button
              onClick={() => handleSelect('roadmap')}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="View Roadmap"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
