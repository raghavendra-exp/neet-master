import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Target,
  Clock,
  Bookmark
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const { mistakes } = useUserProgress();

  const items = [
    { id: 'home', label: t('nav.home'), icon: LayoutDashboard },
    { id: 'syllabus', label: t('nav.syllabus'), icon: Layers },
    { id: 'practice', label: t('nav.practice'), icon: Target },
    { id: 'mock-tests', label: t('nav.mock'), icon: Clock },
    { id: 'error-notebook', label: t('nav.errorNotebook'), icon: Bookmark, badge: mistakes.length }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 lg:hidden px-2 py-1 flex items-center justify-around safe-area-bottom">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-brand-600 dark:text-brand-400 font-semibold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge && item.badge > 0 ? (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
