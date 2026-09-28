import React from 'react';

export type QuestionStatus = 'answered' | 'not-answered' | 'not-visited' | 'marked-review' | 'answered-marked-review';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  statuses: Record<number, QuestionStatus>;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentIndex,
  onSelectIndex,
  statuses
}) => {
  const getStatusCount = (status: QuestionStatus) => {
    return Object.values(statuses).filter(s => s === status).length;
  };

  const answeredCount = getStatusCount('answered');
  const notAnsweredCount = getStatusCount('not-answered');
  const notVisitedCount = totalQuestions - Object.keys(statuses).length;
  const markedReviewCount = getStatusCount('marked-review');
  const answeredMarkedCount = getStatusCount('answered-marked-review');

  const getButtonClass = (index: number) => {
    const isCurrent = index === currentIndex;
    const status = statuses[index] || 'not-visited';

    let base = "w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all relative border ";

    if (isCurrent) {
      base += "ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-slate-900 ";
    }

    switch (status) {
      case 'answered':
        return base + "bg-emerald-600 text-white border-emerald-700 shadow-sm";
      case 'not-answered':
        return base + "bg-rose-600 text-white border-rose-700 shadow-sm";
      case 'marked-review':
        return base + "bg-purple-600 text-white border-purple-700 shadow-sm";
      case 'answered-marked-review':
        return base + "bg-purple-600 text-white border-purple-700 shadow-sm";
      default:
        return base + "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4">
      <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center justify-between">
        <span>Question Palette</span>
        <span className="text-xs font-normal text-slate-500">{totalQuestions} Questions</span>
      </h3>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-[11px] pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            {answeredCount}
          </span>
          <span className="text-slate-600 dark:text-slate-400">Answered</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            {notAnsweredCount}
          </span>
          <span className="text-slate-600 dark:text-slate-400">Not Answered</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            {markedReviewCount}
          </span>
          <span className="text-slate-600 dark:text-slate-400">Review</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5 rounded bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            {answeredMarkedCount}
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-white"></span>
          </div>
          <span className="text-slate-600 dark:text-slate-400">Ans & Marked</span>
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <span className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">
            {Math.max(0, notVisitedCount)}
          </span>
          <span className="text-slate-600 dark:text-slate-400">Not Visited</span>
        </div>
      </div>

      {/* Grid of Question Numbers */}
      <div className="max-h-72 overflow-y-auto pr-1">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const status = statuses[i];
            const isAnsMarked = status === 'answered-marked-review';
            return (
              <button
                key={i}
                onClick={() => onSelectIndex(i)}
                className={getButtonClass(i)}
                title={`Question ${i + 1} (${status || 'Not Visited'})`}
              >
                {i + 1}
                {isAnsMarked && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-white"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
