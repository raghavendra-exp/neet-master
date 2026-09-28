import React, { useState } from 'react';
import { Bookmark, CheckCircle2, XCircle, AlertCircle, HelpCircle, ChevronDown, ChevronUp, Flag } from 'lucide-react';
import { Question, MistakeType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';

interface QuestionCardProps {
  question: Question;
  selectedOption?: number | null;
  onSelectOption?: (optionIndex: number) => void;
  showImmediateFeedback?: boolean;
  isMockMode?: boolean;
  questionNumber?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption: externalSelected,
  onSelectOption,
  showImmediateFeedback = true,
  isMockMode = false,
  questionNumber
}) => {
  const { language } = useLanguage();
  const { bookmarks, toggleBookmark, addMistake } = useUserProgress();

  const [internalSelected, setInternalSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showMistakeDialog, setShowMistakeDialog] = useState(false);
  const [mistakeType, setMistakeType] = useState<MistakeType>('Concept Gap');
  const [customNote, setCustomNote] = useState('');
  const [mistakeAdded, setMistakeAdded] = useState(false);

  const selected = externalSelected !== undefined ? externalSelected : internalSelected;
  const isBookmarked = bookmarks.includes(question.id);

  const handleOptionClick = (idx: number) => {
    if (onSelectOption) {
      onSelectOption(idx);
    } else {
      setInternalSelected(idx);
      if (showImmediateFeedback && idx !== question.answer) {
        // Automatically suggest adding to error notebook
      }
    }
  };

  const handleSaveMistake = () => {
    addMistake({
      questionId: question.id,
      questionText: question.question,
      subject: question.subject,
      chapter: question.chapter,
      topic: question.topic,
      myAnswer: selected !== null ? selected : -1,
      correctAnswer: question.answer,
      explanation: question.explanation,
      mistakeType: mistakeType,
      userNote: customNote
    });
    setMistakeAdded(true);
    setShowMistakeDialog(false);
  };

  const qText = (language === 'hi' && question.questionHi) ? question.questionHi : question.question;
  const opts = (language === 'hi' && question.optionsHi && question.optionsHi.length === question.options.length)
    ? question.optionsHi
    : question.options;
  const expl = (language === 'hi' && question.explanationHi) ? question.explanationHi : question.explanation;

  const difficultyColors = {
    easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-300',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-300',
    hard: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border-rose-300'
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Top Header: Number, Tags, Bookmark */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2">
          {questionNumber !== undefined && (
            <span className="font-extrabold text-sm px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
              Q{questionNumber}
            </span>
          )}

          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {question.subject}
          </span>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${difficultyColors[question.difficulty]}`}>
            {question.difficulty}
          </span>

          {question.isVerifiedPyq && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
              VERIFIED PYQ {question.pyqYear ? `'${String(question.pyqYear).slice(-2)}` : ''}
            </span>
          )}

          {question.sourceType && !question.isVerifiedPyq && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/30 dark:text-brand-300">
              {question.sourceType}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(question.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Chapter & Topic Path */}
      <div className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5 flex-wrap">
        <span className="font-medium text-slate-700 dark:text-slate-300">{question.chapter}</span>
        <span>•</span>
        <span className="italic">{question.topic}</span>
        {question.ncertReference && (
          <>
            <span>•</span>
            <span className="text-brand-600 dark:text-brand-400 font-medium">{question.ncertReference}</span>
          </>
        )}
      </div>

      {/* Question Text */}
      <div className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed mb-6 whitespace-pre-line">
        {qText}
      </div>

      {/* Options List */}
      <div className="space-y-2.5 mb-6">
        {opts.map((option, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === question.answer;
          const isWrongSelected = isSelected && !isCorrect && showImmediateFeedback && !isMockMode;
          const showGreen = showImmediateFeedback && !isMockMode && selected !== null && isCorrect;

          let btnClass = "w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm sm:text-base transition-all flex items-start justify-between gap-3 ";
          
          if (isMockMode) {
            // Mock test mode: only show user selection
            if (isSelected) {
              btnClass += "border-brand-500 bg-brand-50 dark:bg-brand-950/30 text-brand-900 dark:text-brand-200 font-medium ring-2 ring-brand-500/20";
            } else {
              btnClass += "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200";
            }
          } else if (showImmediateFeedback && selected !== null) {
            // Immediate practice feedback mode
            if (showGreen) {
              btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500";
            } else if (isWrongSelected) {
              btnClass += "border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 font-semibold ring-1 ring-rose-500";
            } else {
              btnClass += "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 text-slate-400 dark:text-slate-500 opacity-60";
            }
          } else {
            // Unanswered practice question
            btnClass += "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200";
          }

          const optionLetters = ['A', 'B', 'C', 'D'];

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={btnClass}
            >
              <div className="flex items-start gap-3">
                <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {optionLetters[idx]}
                </span>
                <span className="leading-snug text-left">{option}</span>
              </div>

              {showImmediateFeedback && !isMockMode && selected !== null && (
                <div className="shrink-0 mt-1">
                  {showGreen && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                  {isWrongSelected && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Practice Mode Actions: Explanation Toggle & Add to Error Notebook */}
      {!isMockMode && selected !== null && showImmediateFeedback && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showExplanation ? "Hide Explanation (व्याख्या छुपाएं)" : "Show Explanation (विस्तृत व्याख्या देखें)"}</span>
              {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {selected !== question.answer && (
              <button
                onClick={() => setShowMistakeDialog(true)}
                disabled={mistakeAdded}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                  mistakeAdded
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{mistakeAdded ? "Saved to Error Notebook ✓" : "Log in Error Notebook"}</span>
              </button>
            )}
          </div>

          {showExplanation && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-sm space-y-2">
              <div className="font-bold text-xs uppercase text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Correct Answer: Option {['A', 'B', 'C', 'D'][question.answer]}
              </div>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                {expl}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mistake Classification Dialog Modal */}
      {showMistakeDialog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Classify Your Mistake
              </h3>
              <button
                onClick={() => setShowMistakeDialog(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Mistake Category (कारण पहचानें):
              </label>
              <select
                value={mistakeType}
                onChange={(e) => setMistakeType(e.target.value as MistakeType)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-brand-500"
              >
                <option value="Concept Gap">Concept Gap (अवधारणा में कमी)</option>
                <option value="Formula Error">Formula Error (सूत्र भूल गए या गलत लगाया)</option>
                <option value="Calculation Error">Calculation Error (गणना में त्रुटि)</option>
                <option value="Silly Mistake">Silly Mistake (जल्दबाजी या सिली मिस्टेक)</option>
                <option value="Memory Error">Memory Error (याद नहीं रहा/भूल गए)</option>
                <option value="Misread Question">Misread Question (प्रश्न गलत पढ़ा/NOT नहीं देखा)</option>
                <option value="Time Pressure">Time Pressure (समय का दबाव)</option>
                <option value="Guess">Blind Guess (तुक्का लगाया था)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Personal Note / Self-Correction (स्वयं के लिए टिप्पणी):
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Always check if temperature is in Kelvin, not Celsius..."
                rows={3}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowMistakeDialog(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMistake}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/20"
              >
                Save to Error Notebook
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
