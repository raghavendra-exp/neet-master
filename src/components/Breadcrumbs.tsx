import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  tabId?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigateHome: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigateHome }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center overflow-x-auto py-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 no-scrollbar whitespace-nowrap mb-4"
    >
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" />
            {isLast || !item.onClick ? (
              <span className="font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
