import React, { createContext, useContext, useState, useEffect } from 'react';
import { MistakeEntry, MistakeType, Subject } from '../types';

export interface MockResult {
  id: string;
  testTitle: string;
  date: string;
  timestamp: number;
  score: number;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracy: number;
  timeSpentSeconds: number;
  subjectScores: {
    Physics: { correct: number; incorrect: number; unattempted: number; score: number };
    Chemistry: { correct: number; incorrect: number; unattempted: number; score: number };
    Biology: { correct: number; incorrect: number; unattempted: number; score: number };
  };
}

export type NcertHighlightType = 'important' | 'confusing' | 'mastered' | 'revise' | 'bookmark';

interface UserProgressContextType {
  mistakes: MistakeEntry[];
  addMistake: (entry: Omit<MistakeEntry, 'id' | 'timestamp' | 'isMastered'>) => void;
  updateMistakeType: (id: string, type: MistakeType) => void;
  updateMistakeNote: (id: string, note: string) => void;
  toggleMasteredMistake: (id: string) => void;
  removeMistake: (id: string) => void;

  bookmarks: string[];
  toggleBookmark: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;

  ncertHighlights: Record<string, NcertHighlightType[]>;
  toggleNcertHighlight: (topicId: string, highlight: NcertHighlightType) => void;

  mockResults: MockResult[];
  recordMockResult: (result: Omit<MockResult, 'id' | 'timestamp'>) => void;

  // Flashcards spaced repetition Leitner box / intervals
  flashcardReviews: Record<string, { intervalDays: number; nextReviewDate: string }>;
  reviewFlashcard: (flashcardId: string, wasCorrect: boolean) => void;

  stats: {
    totalAttempted: number;
    totalCorrect: number;
    totalIncorrect: number;
    streakDays: number;
    studyMinutes: number;
  };
  recordPracticeAttempt: (isCorrect: boolean, timeSeconds?: number) => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>(() => {
    try {
      const saved = localStorage.getItem('neet_user_mistakes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('neet_user_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [ncertHighlights, setNcertHighlights] = useState<Record<string, NcertHighlightType[]>>(() => {
    try {
      const saved = localStorage.getItem('neet_user_ncert_highlights');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [mockResults, setMockResults] = useState<MockResult[]>(() => {
    try {
      const saved = localStorage.getItem('neet_user_mock_results');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [flashcardReviews, setFlashcardReviews] = useState<Record<string, { intervalDays: number; nextReviewDate: string }>>(() => {
    try {
      const saved = localStorage.getItem('neet_user_flashcard_reviews');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [stats, setStats] = useState<{
    totalAttempted: number;
    totalCorrect: number;
    totalIncorrect: number;
    streakDays: number;
    studyMinutes: number;
  }>(() => {
    try {
      const saved = localStorage.getItem('neet_user_stats');
      return saved ? JSON.parse(saved) : {
        totalAttempted: 0,
        totalCorrect: 0,
        totalIncorrect: 0,
        streakDays: 3,
        studyMinutes: 45
      };
    } catch {
      return { totalAttempted: 0, totalCorrect: 0, totalIncorrect: 0, streakDays: 3, studyMinutes: 45 };
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('neet_user_mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  useEffect(() => {
    localStorage.setItem('neet_user_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('neet_user_ncert_highlights', JSON.stringify(ncertHighlights));
  }, [ncertHighlights]);

  useEffect(() => {
    localStorage.setItem('neet_user_mock_results', JSON.stringify(mockResults));
  }, [mockResults]);

  useEffect(() => {
    localStorage.setItem('neet_user_flashcard_reviews', JSON.stringify(flashcardReviews));
  }, [flashcardReviews]);

  useEffect(() => {
    localStorage.setItem('neet_user_stats', JSON.stringify(stats));
  }, [stats]);

  const addMistake = (entry: Omit<MistakeEntry, 'id' | 'timestamp' | 'isMastered'>) => {
    setMistakes((prev) => {
      const existing = prev.find(m => m.questionId === entry.questionId);
      if (existing) return prev;
      const newEntry: MistakeEntry = {
        ...entry,
        id: `mistake-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        timestamp: Date.now(),
        isMastered: false
      };
      return [newEntry, ...prev];
    });
  };

  const updateMistakeType = (id: string, type: MistakeType) => {
    setMistakes(prev => prev.map(m => m.id === id ? { ...m, mistakeType: type } : m));
  };

  const updateMistakeNote = (id: string, note: string) => {
    setMistakes(prev => prev.map(m => m.id === id ? { ...m, userNote: note } : m));
  };

  const toggleMasteredMistake = (id: string) => {
    setMistakes(prev => prev.map(m => m.id === id ? { ...m, isMastered: !m.isMastered } : m));
  };

  const removeMistake = (id: string) => {
    setMistakes(prev => prev.filter(m => m.id !== id));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarks((prev) =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const isBookmarked = (questionId: string) => bookmarks.includes(questionId);

  const toggleNcertHighlight = (topicId: string, highlight: NcertHighlightType) => {
    setNcertHighlights((prev) => {
      const current = prev[topicId] || [];
      const updated = current.includes(highlight)
        ? current.filter(h => h !== highlight)
        : [...current, highlight];
      return { ...prev, [topicId]: updated };
    });
  };

  const recordMockResult = (result: Omit<MockResult, 'id' | 'timestamp'>) => {
    const fullResult: MockResult = {
      ...result,
      id: `mock-${Date.now()}`,
      timestamp: Date.now()
    };
    setMockResults(prev => [fullResult, ...prev]);
  };

  // Spaced repetition progression: 1d -> 3d -> 7d -> 15d -> 30d -> 60d
  const intervals = [1, 3, 7, 15, 30, 60];

  const reviewFlashcard = (flashcardId: string, wasCorrect: boolean) => {
    setFlashcardReviews((prev) => {
      const current = prev[flashcardId] || { intervalDays: 1, nextReviewDate: new Date().toISOString() };
      let nextInterval = 1;
      if (wasCorrect) {
        const curIdx = intervals.indexOf(current.intervalDays);
        nextInterval = curIdx < intervals.length - 1 ? intervals[curIdx + 1] : 60;
      } else {
        nextInterval = 1; // reset on error
      }
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + nextInterval);

      return {
        ...prev,
        [flashcardId]: {
          intervalDays: nextInterval,
          nextReviewDate: nextDate.toISOString().split('T')[0]
        }
      };
    });
  };

  const recordPracticeAttempt = (isCorrect: boolean, timeSeconds: number = 60) => {
    setStats((prev) => ({
      ...prev,
      totalAttempted: prev.totalAttempted + 1,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      totalIncorrect: !isCorrect ? prev.totalIncorrect + 1 : prev.totalIncorrect,
      studyMinutes: prev.studyMinutes + Math.round(timeSeconds / 60)
    }));
  };

  return (
    <UserProgressContext.Provider
      value={{
        mistakes,
        addMistake,
        updateMistakeType,
        updateMistakeNote,
        toggleMasteredMistake,
        removeMistake,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        ncertHighlights,
        toggleNcertHighlight,
        mockResults,
        recordMockResult,
        flashcardReviews,
        reviewFlashcard,
        stats,
        recordPracticeAttempt
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = (): UserProgressContextType => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};
