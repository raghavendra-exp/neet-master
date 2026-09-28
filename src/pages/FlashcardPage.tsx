import React, { useState } from 'react';
import { Sparkles, RotateCw, CheckCircle2, XCircle, Clock, BookOpen, Layers } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import flashcardsData from '../data/flashcards/flashcards.json';
import { Flashcard, Subject } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';

interface FlashcardPageProps {
  onNavigateHome: () => void;
}

export const FlashcardPage: React.FC<FlashcardPageProps> = ({ onNavigateHome }) => {
  const { language } = useLanguage();
  const { flashcardReviews, reviewFlashcard } = useUserProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'today'>('all');

  const filteredFlashcards: Flashcard[] = (flashcardsData as Flashcard[]).filter((fc) => {
    const matchSub = selectedSubject === 'all' || fc.subject === selectedSubject;
    if (!matchSub) return false;

    if (activeTab === 'today') {
      const review = flashcardReviews[fc.id];
      if (!review) return true; // new card is due
      const today = new Date().toISOString().split('T')[0];
      return review.nextReviewDate <= today;
    }
    return true;
  });

  const card = filteredFlashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => (i + 1) % (filteredFlashcards.length || 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => (i - 1 + filteredFlashcards.length) % (filteredFlashcards.length || 1));
  };

  const handleReviewAnswer = (correct: boolean) => {
    if (!card) return;
    reviewFlashcard(card.id, correct);
    handleNext();
  };

  const currentReview = card ? flashcardReviews[card.id] : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: language === 'hi' ? 'फ्लैशकार्ड एवं त्वरित स्मरण' : 'Flashcards & Spaced Repetition' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white border border-purple-900/50 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Scientific Spaced Repetition (1d • 3d • 7d • 15d • 30d • 60d)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          NEET FLASHCARD ENGINE
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Commit high-yield NCERT facts, physics formulas, and organic exceptions to permanent long-term memory through optimized active recall.
        </p>
      </div>

      {/* Filter and Tab Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveTab('all'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'all' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Flashcards ({flashcardsData.length})
          </button>
          <button
            onClick={() => { setActiveTab('today'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'today' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Today's Revision ⏰
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Subject:</span>
          {(['all', 'Biology', 'Physics', 'Chemistry'] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setSelectedSubject(s); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedSubject === s ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard 3D Card Display */}
      {filteredFlashcards.length > 0 && card ? (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
            <span>Card {currentIndex + 1} of {filteredFlashcards.length}</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[10px] font-bold">
                {card.category}
              </span>
              {currentReview && (
                <span className="text-[10px] text-brand-600 dark:text-brand-400 font-bold">
                  Next: {currentReview.nextReviewDate} ({currentReview.intervalDays}d)
                </span>
              )}
            </div>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[300px] cursor-pointer rounded-3xl p-8 bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-900/60 shadow-xl flex flex-col justify-between transition-all hover:scale-[1.01] hover:border-purple-400 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-slate-700 dark:text-slate-300">{card.subject} • {card.chapter}</span>
              <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold group-hover:underline">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click to Flip</span>
              </span>
            </div>

            <div className="py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">Question / Front</span>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {language === 'hi' && card.frontHi ? card.frontHi : card.front}
                  </p>
                  {card.hint && (
                    <p className="text-xs text-slate-400 italic">Hint: {card.hint}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">Answer / Back</span>
                  <p className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300 leading-relaxed">
                    {language === 'hi' && card.backHi ? card.backHi : card.back}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Ref: {card.ncertRef}</p>
                </div>
              )}
            </div>

            <div className="text-center text-[11px] text-slate-400">
              {isFlipped ? "Did you recall correctly?" : "Tap anywhere on the card to reveal answer"}
            </div>
          </div>

          {/* Feedback buttons when flipped */}
          {isFlipped ? (
            <div className="flex items-center justify-center gap-4 animate-in fade-in">
              <button
                onClick={() => handleReviewAnswer(false)}
                className="px-6 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300 font-bold text-xs flex items-center gap-1.5 border border-rose-300"
              >
                <XCircle className="w-4 h-4" />
                <span>Forgot / Repeat (1d)</span>
              </button>

              <button
                onClick={() => handleReviewAnswer(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Got It Right! (Level Up)</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between px-2">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
            No Flashcards Due Today!
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Switch to "All Flashcards" to practice ahead of schedule.
          </p>
        </div>
      )}
    </div>
  );
};
