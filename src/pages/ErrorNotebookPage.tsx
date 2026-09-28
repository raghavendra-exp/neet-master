import React, { useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  ChevronRight
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useUserProgress } from '../context/UserProgressContext';
import { MistakeType, Subject } from '../types';

interface ErrorNotebookPageProps {
  onNavigateHome: () => void;
  onPracticeAgain: (questionIds: string[]) => void;
}

export const ErrorNotebookPage: React.FC<ErrorNotebookPageProps> = ({
  onNavigateHome,
  onPracticeAgain
}) => {
  const {
    mistakes,
    updateMistakeType,
    updateMistakeNote,
    toggleMasteredMistake,
    removeMistake
  } = useUserProgress();

  const [filterType, setFilterType] = useState<MistakeType | 'all'>('all');
  const [filterSubject, setFilterSubject] = useState<Subject | 'all'>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const filteredMistakes = mistakes.filter(m => {
    const matchType = filterType === 'all' || m.mistakeType === filterType;
    const matchSubj = filterSubject === 'all' || m.subject === filterSubject;
    return matchType && matchSubj;
  });

  const handleEditNote = (id: string, currentNote: string) => {
    setEditingNoteId(id);
    setTempNote(currentNote);
  };

  const handleSaveNote = (id: string) => {
    updateMistakeNote(id, tempNote);
    setEditingNoteId(null);
  };

  const handlePracticeAllErrors = () => {
    const ids = filteredMistakes.map(m => m.questionId);
    onPracticeAgain(ids);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: 'Error Notebook & Mistake Diary' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 text-white border border-rose-900/50 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <AlertCircle className="w-4 h-4" />
          <span>Diagnostic Mistake Log</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              NEET ERROR NOTEBOOK
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              "NEET is won not just by learning new concepts, but by never repeating a past mistake twice."
            </p>
          </div>
          {filteredMistakes.length > 0 && (
            <button
              onClick={handlePracticeAllErrors}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 shrink-0"
            >
              Re-Practice These ({filteredMistakes.length}) Questions
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-400">Filter By Subject:</span>
          {(['all', 'Physics', 'Chemistry', 'Biology'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterSubject(s)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterSubject === s ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {s === 'all' ? 'All Subjects' : s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-400">Mistake Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All Classifications</option>
            <option value="Concept Gap">Concept Gap</option>
            <option value="Formula Error">Formula Error</option>
            <option value="Calculation Error">Calculation Error</option>
            <option value="Silly Mistake">Silly Mistake</option>
            <option value="Memory Error">Memory Error</option>
            <option value="Misread Question">Misread Question</option>
            <option value="Time Pressure">Time Pressure</option>
            <option value="Guess">Guess</option>
          </select>
        </div>
      </div>

      {/* Mistakes List */}
      <div className="space-y-4">
        {filteredMistakes.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
              No Pending Mistakes Logged Here!
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Any question you answer incorrectly during mock tests or practice can be saved here for focused revision.
            </p>
          </div>
        ) : (
          filteredMistakes.map((entry) => (
            <div
              key={entry.id}
              className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all space-y-3 ${
                entry.isMastered
                  ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {entry.subject} • {entry.chapter}
                  </span>
                  <span className="text-xs text-slate-400 italic">({entry.topic})</span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={entry.mistakeType}
                    onChange={(e) => updateMistakeType(entry.id, e.target.value as MistakeType)}
                    className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value="Concept Gap">Concept Gap</option>
                    <option value="Formula Error">Formula Error</option>
                    <option value="Calculation Error">Calculation Error</option>
                    <option value="Silly Mistake">Silly Mistake</option>
                    <option value="Memory Error">Memory Error</option>
                    <option value="Misread Question">Misread Question</option>
                    <option value="Time Pressure">Time Pressure</option>
                    <option value="Guess">Guess</option>
                  </select>

                  <button
                    onClick={() => toggleMasteredMistake(entry.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      entry.isMastered
                        ? 'bg-emerald-600 text-white'
                        : 'border border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                    }`}
                  >
                    {entry.isMastered ? 'Mastered ✓' : 'Mark Mastered'}
                  </button>

                  <button
                    onClick={() => removeMistake(entry.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove from notebook"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-pre-line">
                {entry.questionText}
              </div>

              {/* Answers Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200">
                  <span className="font-bold">My Answer: </span>
                  {entry.myAnswer !== -1 ? `Option ${['A', 'B', 'C', 'D'][entry.myAnswer]}` : 'Unattempted'}
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
                  <span className="font-bold">Correct Answer: </span>
                  Option {['A', 'B', 'C', 'D'][entry.correctAnswer]}
                </div>
              </div>

              {/* Explanation */}
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">Explanation:</span>
                {entry.explanation}
              </div>

              {/* Personal Reflection Note */}
              <div className="pt-1">
                {editingNoteId === entry.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempNote}
                      onChange={(e) => setTempNote(e.target.value)}
                      rows={2}
                      placeholder="Write what you learned to avoid this mistake in NEET..."
                      className="w-full p-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-3 py-1 rounded-lg text-xs text-slate-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNote(entry.id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-600 text-white"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="italic">
                      Note: {entry.userNote || "No personal reflection written yet."}
                    </span>
                    <button
                      onClick={() => handleEditNote(entry.id, entry.userNote || '')}
                      className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                    >
                      {entry.userNote ? "Edit Note" : "+ Add Personal Note"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
