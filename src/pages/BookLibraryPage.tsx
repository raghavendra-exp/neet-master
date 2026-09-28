import React, { useState } from 'react';
import { BookMarked, ExternalLink, ShieldCheck, CheckCircle2, Search, Filter } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import booksData from '../data/books/books.json';
import { BookInfo, Subject } from '../types';

interface BookLibraryPageProps {
  onNavigateHome: () => void;
  onMapToSyllabus?: (subject: Subject) => void;
}

export const BookLibraryPage: React.FC<BookLibraryPageProps> = ({
  onNavigateHome,
  onMapToSyllabus
}) => {
  const [subjectFilter, setSubjectFilter] = useState<Subject | 'All'>('All');
  const [search, setSearch] = useState('');

  const filteredBooks = (booksData as BookInfo[]).filter((b) => {
    const matchSubj = subjectFilter === 'All' || b.subject === subjectFilter;
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.publisher.toLowerCase().includes(search.toLowerCase());
    return matchSubj && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: 'NEET Book Library & Recommendations' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white shadow-xl space-y-3 border border-amber-900/50">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Legitimate Publisher Links • Anti-Piracy Policy</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          NEET PREPARATION BOOK DIRECTORY
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Carefully researched reference books from reputable publishers (NCERT, MTG, Arihant, HC Verma, Balaji). We provide solely verified official bookstore links.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <span className="font-bold text-slate-400 mr-1">Subject:</span>
          {(['All', 'Biology', 'Physics', 'Chemistry'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSubjectFilter(s)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                subjectFilter === s
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books by author or title..."
            className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-500/60 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {book.subject} • {book.level}
                </span>
                <span className="text-xs text-slate-400">
                  Verified: {book.lastVerified}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                  {book.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  By {book.author} • {book.publisher} ({book.edition})
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                <div>
                  <strong className="text-slate-700 dark:text-slate-300">Best For: </strong>
                  <span className="text-slate-600 dark:text-slate-400">{book.bestUse}</span>
                </div>
                <div>
                  <strong className="text-slate-700 dark:text-slate-300">Syllabus Coverage: </strong>
                  <span className="text-slate-600 dark:text-slate-400">{book.syllabusCoverage}</span>
                </div>
                <div>
                  <strong className="text-slate-700 dark:text-slate-300">Practice Volume: </strong>
                  <span className="text-slate-600 dark:text-slate-400">{book.questionCountApprox}</span>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Key Highlights:</span>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {book.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <a
                href={book.legitimateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex items-center gap-1.5"
              >
                <span>View / Buy Legally</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {onMapToSyllabus && book.subject !== 'All' && (
                <button
                  onClick={() => onMapToSyllabus(book.subject as Subject)}
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Map to Syllabus →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
