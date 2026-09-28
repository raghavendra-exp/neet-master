import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, BookOpen, Layers, Target, Clock, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import physicsChapters from '../data/syllabus/physics.json';
import chemistryChapters from '../data/syllabus/chemistry.json';
import biologyChapters from '../data/syllabus/biology.json';
import booksData from '../data/books/books.json';
import updatesData from '../data/updates/neet-updates.json';
import collegesData from '../data/colleges/medical-colleges.json';
import flashcardsData from '../data/flashcards/flashcards.json';
import { allQuestions } from '../data/questions';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string, payload?: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const { language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled by parent
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{
      category: string;
      title: string;
      subtitle: string;
      tabId: string;
      payload?: any;
      icon: any;
    }> = [];

    // Search Chapters
    [...physicsChapters, ...chemistryChapters, ...biologyChapters].forEach((ch) => {
      if (
        ch.name.toLowerCase().includes(q) ||
        (ch.nameHi && ch.nameHi.toLowerCase().includes(q)) ||
        ch.unit.toLowerCase().includes(q)
      ) {
        results.push({
          category: 'Chapter',
          title: language === 'hi' ? ch.nameHi : ch.name,
          subtitle: `${ch.subject} • Class ${ch.classLevel} • Weightage: ${ch.weightagePercentage}%`,
          tabId: ch.subject.toLowerCase(),
          payload: { chapterId: ch.id },
          icon: Layers
        });
      }

      // Search Topics
      ch.topics?.forEach((tp) => {
        if (
          tp.name.toLowerCase().includes(q) ||
          (tp.nameHi && tp.nameHi.toLowerCase().includes(q))
        ) {
          results.push({
            category: 'Topic',
            title: language === 'hi' ? tp.nameHi : tp.name,
            subtitle: `${ch.name} (${ch.subject})`,
            tabId: ch.subject.toLowerCase(),
            payload: { chapterId: ch.id },
            icon: Target
          });
        }
      });
    });

    // Search Questions (first 10 matches)
    let qMatches = 0;
    for (const quest of allQuestions) {
      if (qMatches >= 8) break;
      if (
        quest.question.toLowerCase().includes(q) ||
        (quest.questionHi && quest.questionHi.toLowerCase().includes(q)) ||
        quest.topic.toLowerCase().includes(q)
      ) {
        results.push({
          category: quest.isVerifiedPyq ? 'Verified PYQ' : 'Question',
          title: quest.question.substring(0, 85) + '...',
          subtitle: `${quest.subject} • ${quest.chapter} • ${quest.difficulty.toUpperCase()}`,
          tabId: 'practice',
          payload: { questionId: quest.id },
          icon: Clock
        });
        qMatches++;
      }
    }

    // Search Books
    booksData.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) {
        results.push({
          category: 'Book',
          title: b.title,
          subtitle: `${b.author} • ${b.publisher} (${b.level})`,
          tabId: 'books',
          icon: BookOpen
        });
      }
    });

    // Search Colleges
    collegesData.forEach((c) => {
      if (c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)) {
        results.push({
          category: 'Medical College',
          title: c.name,
          subtitle: `${c.city}, ${c.state} • ${c.totalMbbsSeats} MBBS Seats`,
          tabId: 'colleges',
          icon: Building2
        });
      }
    });

    // Search Updates
    updatesData.forEach((u) => {
      if (u.title.toLowerCase().includes(q) || u.summary.toLowerCase().includes(q)) {
        results.push({
          category: 'Official Notice',
          title: language === 'hi' ? u.titleHi : u.title,
          subtitle: `${u.date} • ${u.officialSource}`,
          tabId: 'live-status',
          icon: Sparkles
        });
      }
    });

    return results.slice(0, 20);
  }, [query, language]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-sm flex justify-center items-start animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'hi' ? "पाठ्यक्रम, अध्याय, PYQ, पुस्तक या कॉलेज खोजें..." : "Search syllabus, chapters, PYQs, questions, books..."}
            className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base sm:text-lg"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>Type to search across 1,500+ questions, verified PYQs, NCERT topics, and books.</p>
              <p className="text-xs mt-1 text-slate-400">English and हिन्दी both supported.</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No results found for "<span className="font-semibold text-slate-600 dark:text-slate-300">{query}</span>"
            </div>
          ) : (
            searchResults.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onNavigate(item.tabId, item.payload);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-start gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
