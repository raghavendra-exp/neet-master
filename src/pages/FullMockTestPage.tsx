import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  Sparkles,
  Award,
  BarChart2,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuestionPalette, QuestionStatus } from '../components/QuestionPalette';
import { QuestionCard } from '../components/QuestionCard';
import { allQuestions } from '../data/questions';
import { Question, Subject } from '../types';
import currentExamData from '../data/exams/neet-ug-current.json';
import { useUserProgress, MockResult } from '../context/UserProgressContext';

interface FullMockTestPageProps {
  onNavigateHome: () => void;
}

export const FullMockTestPage: React.FC<FullMockTestPageProps> = ({ onNavigateHome }) => {
  const { recordMockResult, addMistake } = useUserProgress();

  const [testState, setTestState] = useState<'intro' | 'running' | 'submitted'>('intro');
  const [testCategory, setTestCategory] = useState<'full' | 'physics' | 'chemistry' | 'biology' | 'pyq'>('full');

  // Test questions slice
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});

  // 200 minutes = 12000 seconds for Full NEET Mock
  const totalDurationSeconds = testCategory === 'full' ? 12000 : 3600;
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(totalDurationSeconds);
  const [startTime, setStartTime] = useState<number>(0);

  // Computed final analytics result
  const [finalResult, setFinalResult] = useState<MockResult | null>(null);

  // Initialize test
  const handleStartTest = (category: 'full' | 'physics' | 'chemistry' | 'biology' | 'pyq') => {
    setTestCategory(category);
    let selected: Question[] = [];

    if (category === 'full') {
      // 50 Physics + 50 Chem + 100 Bio = 200 questions official NEET structure
      const phy = allQuestions.filter(q => q.subject === 'Physics').slice(0, 50);
      const chm = allQuestions.filter(q => q.subject === 'Chemistry').slice(0, 50);
      const bio = allQuestions.filter(q => q.subject === 'Biology').slice(0, 100);
      selected = [...phy, ...chm, ...bio];
    } else if (category === 'physics') {
      selected = allQuestions.filter(q => q.subject === 'Physics').slice(0, 50);
    } else if (category === 'chemistry') {
      selected = allQuestions.filter(q => q.subject === 'Chemistry').slice(0, 50);
    } else if (category === 'biology') {
      selected = allQuestions.filter(q => q.subject === 'Biology').slice(0, 100);
    } else if (category === 'pyq') {
      selected = allQuestions.filter(q => q.isVerifiedPyq).slice(0, 50);
    }

    setTestQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setTimeLeftSeconds(category === 'full' ? 12000 : 3600);
    setStartTime(Date.now());
    setTestState('running');
  };

  // Timer countdown
  useEffect(() => {
    if (testState !== 'running') return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testState]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Build question statuses dictionary for QuestionPalette
  const statuses = useMemo(() => {
    const dict: Record<number, QuestionStatus> = {};
    for (let i = 0; i < testQuestions.length; i++) {
      const hasAnswer = userAnswers[i] !== undefined;
      const isMarked = markedForReview[i] === true;

      if (hasAnswer && isMarked) {
        dict[i] = 'answered-marked-review';
      } else if (hasAnswer) {
        dict[i] = 'answered';
      } else if (isMarked) {
        dict[i] = 'marked-review';
      } else if (i === currentIndex || i < currentIndex) {
        dict[i] = 'not-answered';
      } else {
        dict[i] = 'not-visited';
      }
    }
    return dict;
  }, [testQuestions.length, userAnswers, markedForReview, currentIndex]);

  const handleSelectOption = (optIdx: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optIdx
    }));
  };

  const handleClearResponse = () => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  const handleToggleMarkReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const handleSubmitTest = () => {
    // Scoring logic according to current exam marking scheme
    const { correct, incorrect } = currentExamData.pattern.markingScheme;
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const subjectStats: Record<Subject, { correct: number; incorrect: number; unattempted: number; score: number }> = {
      Physics: { correct: 0, incorrect: 0, unattempted: 0, score: 0 },
      Chemistry: { correct: 0, incorrect: 0, unattempted: 0, score: 0 },
      Biology: { correct: 0, incorrect: 0, unattempted: 0, score: 0 }
    };

    testQuestions.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      const subj = q.subject;

      if (userAns === undefined) {
        unattemptedCount++;
        subjectStats[subj].unattempted++;
      } else if (userAns === q.answer) {
        correctCount++;
        score += correct;
        subjectStats[subj].correct++;
        subjectStats[subj].score += correct;
      } else {
        incorrectCount++;
        score += incorrect;
        subjectStats[subj].incorrect++;
        subjectStats[subj].score += incorrect;

        // Automatically log mistakes to user progress
        addMistake({
          questionId: q.id,
          questionText: q.question,
          subject: q.subject,
          chapter: q.chapter,
          topic: q.topic,
          myAnswer: userAns,
          correctAnswer: q.answer,
          explanation: q.explanation,
          mistakeType: 'Concept Gap',
          userNote: `Logged from ${testCategory.toUpperCase()} Mock Test attempt`
        });
      }
    });

    const totalMarks = testQuestions.length * correct;
    const accuracy = (correctCount + incorrectCount) > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;
    const timeSpent = Math.max(0, Math.round((Date.now() - startTime) / 1000));

    const result: MockResult = {
      id: `mock-${Date.now()}`,
      testTitle: `${testCategory.toUpperCase()} NEET Mock Simulation`,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      score,
      totalMarks,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracy,
      timeSpentSeconds: timeSpent,
      subjectScores: subjectStats
    };

    setFinalResult(result);
    recordMockResult(result);
    setTestState('submitted');

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Breadcrumbs
        items={[{ label: 'Mock Test Center' }]}
        onNavigateHome={onNavigateHome}
      />

      {/* STATE 1: INTRO / SELECT CATEGORY */}
      {testState === 'intro' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-medical-950 text-white border border-brand-800/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400">
              <Sparkles className="w-4 h-4" />
              <span>Full Official Simulation (NTA Pattern)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              NEET FULL MOCK SIMULATION
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Experience the actual exam environment with standard 200 questions, +4/-1 negative marking engine, official 5-state question palette, and detailed post-exam diagnostic review.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Full NEET Mock */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm hover:border-brand-500 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                  720 Marks Full Simulation
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                  Full NEET Grand Mock (200 Qs)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Physics (50) • Chemistry (50) • Botany (50) • Zoology (50). Full 200 minutes countdown.
                </p>
              </div>
              <button
                onClick={() => handleStartTest('full')}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/20"
              >
                Start Grand Mock
              </button>
            </div>

            {/* Physics Subject Mock */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm hover:border-blue-500 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  180 Marks Sectional
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                  Physics Sectional Mock (50 Qs)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  High-yield numericals, kinematics, electrodynamics, optics, and practical physics. 60 mins.
                </p>
              </div>
              <button
                onClick={() => handleStartTest('physics')}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
              >
                Start Physics Mock
              </button>
            </div>

            {/* Chemistry Subject Mock */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm hover:border-teal-500 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  180 Marks Sectional
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                  Chemistry Sectional Mock (50 Qs)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Physical equilibria, coordination chemistry, periodic exceptions, and organic reaction maps. 60 mins.
                </p>
              </div>
              <button
                onClick={() => handleStartTest('chemistry')}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20"
              >
                Start Chemistry Mock
              </button>
            </div>

            {/* Biology Subject Mock */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm hover:border-emerald-500 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  360 Marks Sectional
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                  Biology Grand Mock (100 Qs)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Botany and Zoology NCERT line-by-line questions with Genetics, Ecology, and Physiology. 60 mins.
                </p>
              </div>
              <button
                onClick={() => handleStartTest('biology')}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
              >
                Start Biology Mock
              </button>
            </div>

            {/* PYQ Simulation Mock */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm hover:border-amber-500 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  Verified PYQs
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                  Previous-Year Speed Mock (50 Qs)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  100% verified previous years questions from 2020-2025. Perfect for benchmarking. 60 mins.
                </p>
              </div>
              <button
                onClick={() => handleStartTest('pyq')}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20"
              >
                Start PYQ Mock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: RUNNING MOCK TEST */}
      {testState === 'running' && testQuestions.length > 0 && (
        <div className="space-y-4">
          {/* Sticky Header with Timer & Submit Button */}
          <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 font-mono text-base sm:text-lg font-black px-3 py-1.5 rounded-xl border ${
                timeLeftSeconds < 600
                  ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/40 dark:text-rose-400 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
              }`}>
                <Clock className="w-4 h-4 text-brand-600" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Question {currentIndex + 1} of {testQuestions.length}
              </span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Submit Test</span>
            </button>
          </div>

          {/* Main Test Layout: Question View + Side Palette */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Question Card & Nav controls */}
            <div className="lg:col-span-2 space-y-4">
              <QuestionCard
                question={testQuestions[currentIndex]}
                questionNumber={currentIndex + 1}
                selectedOption={userAnswers[currentIndex] !== undefined ? userAnswers[currentIndex] : null}
                onSelectOption={handleSelectOption}
                isMockMode={true}
                showImmediateFeedback={false}
              />

              {/* Action Toolbar */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMarkReview}
                    className={`px-3.5 py-2 rounded-xl border font-semibold transition-colors ${
                      markedForReview[currentIndex]
                        ? 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {markedForReview[currentIndex] ? 'Marked for Review ✓' : 'Mark for Review'}
                  </button>

                  <button
                    onClick={handleClearResponse}
                    disabled={userAnswers[currentIndex] === undefined}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                    disabled={currentIndex === 0}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 flex items-center gap-1 font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => setCurrentIndex(i => Math.min(testQuestions.length - 1, i + 1))}
                    disabled={currentIndex === testQuestions.length - 1}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold disabled:opacity-40 flex items-center gap-1"
                  >
                    <span>Save & Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Question Palette */}
            <div>
              <QuestionPalette
                totalQuestions={testQuestions.length}
                currentIndex={currentIndex}
                onSelectIndex={(idx) => setCurrentIndex(idx)}
                statuses={statuses}
              />
            </div>
          </div>
        </div>
      )}

      {/* STATE 3: POST-SUBMISSION ANALYTICS */}
      {testState === 'submitted' && finalResult && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Test Evaluated (Official +4 / -1 Marking)
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                  {finalResult.testTitle} - Performance Report
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Completed on {finalResult.date} • Total Time Used: {formatTime(finalResult.timeSpentSeconds)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTestState('intro')}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Take Another Test
                </button>
              </div>
            </div>

            {/* Summary Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60">
                <span className="text-xs text-brand-700 dark:text-brand-300 font-semibold block">Total Score</span>
                <span className="text-3xl font-black text-brand-700 dark:text-brand-300">
                  {finalResult.score} <span className="text-sm font-normal text-slate-400">/ {finalResult.totalMarks}</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold block">Accuracy</span>
                <span className="text-3xl font-black text-emerald-700 dark:text-emerald-300">
                  {finalResult.accuracy}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 font-semibold block">Attempted</span>
                <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                  {finalResult.correctCount + finalResult.incorrectCount} <span className="text-sm font-normal text-slate-400">/ {testQuestions.length}</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
                <span className="text-xs text-rose-700 dark:text-rose-300 font-semibold block">Negative Marks Lost</span>
                <span className="text-3xl font-black text-rose-700 dark:text-rose-300">
                  -{finalResult.incorrectCount}
                </span>
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Subject-wise Performance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['Physics', 'Chemistry', 'Biology'] as Subject[]).map((subj) => {
                  const stat = finalResult.subjectScores[subj];
                  return (
                    <div key={subj} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>{subj}</span>
                        <span className="text-brand-600 dark:text-brand-400">{stat.score} Marks</span>
                      </div>
                      <div className="text-xs space-y-1 text-slate-500">
                        <div className="flex justify-between">
                          <span>Correct:</span>
                          <span className="font-semibold text-emerald-600">{stat.correct}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Incorrect:</span>
                          <span className="font-semibold text-rose-600">{stat.incorrect}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unattempted:</span>
                          <span className="font-semibold">{stat.unattempted}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Wrong Question Review */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-500" />
                <span>Questions Review & Explanations ({testQuestions.length} Questions)</span>
              </h3>

              <div className="space-y-4">
                {testQuestions.map((q, idx) => {
                  const userAns = userAnswers[idx];
                  const isCorrect = userAns === q.answer;
                  return (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      questionNumber={idx + 1}
                      selectedOption={userAns !== undefined ? userAns : null}
                      showImmediateFeedback={true}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
