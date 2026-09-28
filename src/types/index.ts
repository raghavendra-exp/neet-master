export type Language = 'en' | 'hi';

export type QuestionType =
  | 'mcq'
  | 'assertion_reason'
  | 'statement_based'
  | 'match'
  | 'numerical'
  | 'diagram';

export type SourceType =
  | 'OFFICIAL'
  | 'NCERT'
  | 'VERIFIED PYQ'
  | 'ORIGINAL'
  | 'REFERENCE'
  | 'CURRENT UPDATE';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Subject = 'Physics' | 'Chemistry' | 'Biology';

export interface Question {
  id: string;
  exam: string;
  year?: string;
  subject: Subject;
  chapter: string;
  topic: string;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  questionHi?: string;
  options: string[];
  optionsHi?: string[];
  answer: number; // 0-indexed or 1-indexed? We'll standardize to 0-indexed (0, 1, 2, 3)
  explanation: string;
  explanationHi?: string;
  sourceType: SourceType;
  tags: string[];
  ncertReference?: string;
  isVerifiedPyq?: boolean;
  pyqYear?: number;
  diagramSvg?: string;
}

export interface ExamVersion {
  exam: string;
  year: string;
  status: 'current' | 'upcoming' | 'archived';
  officialSource: string;
  officialSourceName: string;
  notificationDate: string;
  examDate: string;
  application: {
    startDate: string;
    endDate: string;
    feeGeneral: number;
    feeOBC: number;
    feeSCST: number;
    feeNRI: number;
    correctionWindow: string;
  };
  eligibility: {
    minimumAge: string;
    upperAgeLimit: string;
    qualification: string;
    mandatorySubjects: string[];
    minMarksGeneral: string;
    minMarksReserved: string;
    attempts: string;
    nationality: string[];
    ruleType: 'Current NMC Guidelines' | 'Historical NTA Guidelines';
  };
  pattern: {
    mode: string;
    durationMinutes: number;
    totalQuestions: number;
    questionsToAttempt: number;
    totalMarks: number;
    markingScheme: {
      correct: number;
      incorrect: number;
      unattempted: number;
    };
    languagesCount: number;
    languages: string[];
    sections: {
      subject: Subject | 'Botany' | 'Zoology';
      sectionA: { questions: number; marks: number; compulsory: boolean };
      sectionB: { questions: number; attempt: number; marks: number; optional: boolean };
    }[];
  };
  officialLinks: {
    website: string;
    bulletinPdf?: string;
    syllabusPdf?: string;
    nmcNotice?: string;
  };
  lastVerified: string;
}

export interface ChapterSyllabus {
  id: string;
  name: string;
  nameHi: string;
  subject: Subject;
  classLevel: 11 | 12;
  unit: string;
  unitHi: string;
  weightagePercentage: number;
  avgQuestionsPerYear: number;
  ncertChapterNumber: number;
  ncertBook: string;
  topics: {
    name: string;
    nameHi: string;
    isHighYield: boolean;
    isNmcAdded?: boolean;
    isNmcDeleted?: boolean;
  }[];
  nmcNotes?: string;
  keyConcepts: string[];
  formulaHints?: string[];
  commonMistakes: string[];
  shortTricks?: string[];
  recommendedBooks: string[];
}

export interface BookInfo {
  id: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  year: string;
  language: string;
  subject: Subject | 'All';
  level: 'Foundation' | 'Standard NEET' | 'Advanced' | 'PYQ/Revision';
  syllabusCoverage: string;
  pyqCoverage: string;
  questionCountApprox: string;
  features: string[];
  bestUse: string;
  legitimateLink: string;
  lastVerified: string;
  mappedChapters: string[];
}

export interface NcertMapping {
  id: string;
  neetTopic: string;
  subject: Subject;
  ncertClass: 11 | 12;
  chapterNumber: number;
  chapterName: string;
  pageSection: string;
  officialEpathshalaLink: string;
  summary: string;
  highYieldPoints: string[];
  potentialMcqThemes: string[];
  pyqFrequency: string;
}

export interface NeetUpdate {
  id: string;
  date: string;
  category: 'Notification' | 'Application' | 'Admit Card' | 'Exam Date' | 'Answer Key' | 'Result' | 'Counselling' | 'Syllabus';
  title: string;
  titleHi: string;
  summary: string;
  summaryHi: string;
  officialSource: string;
  officialLink: string;
  lastVerified: string;
  isImportant: boolean;
}

export interface Flashcard {
  id: string;
  subject: Subject;
  chapter: string;
  category: 'Biology Fact' | 'Physics Formula' | 'Chemistry Reaction' | 'Inorganic Exception' | 'Definitions';
  front: string;
  frontHi?: string;
  back: string;
  backHi?: string;
  hint?: string;
  ncertRef: string;
  difficulty: Difficulty;
  intervalDays?: number;
  nextReviewDate?: string;
}

export interface MistakeEntry {
  id: string;
  questionId: string;
  questionText: string;
  subject: Subject;
  chapter: string;
  topic: string;
  myAnswer: number;
  correctAnswer: number;
  explanation: string;
  timestamp: number;
  mistakeType: MistakeType;
  userNote: string;
  isMastered: boolean;
}

export type MistakeType =
  | 'Concept Gap'
  | 'Formula Error'
  | 'Calculation Error'
  | 'Silly Mistake'
  | 'Memory Error'
  | 'Misread Question'
  | 'Time Pressure'
  | 'Guess';

export interface PhysicsFormula {
  id: string;
  chapter: string;
  name: string;
  formula: string;
  variables: string;
  siUnits: string;
  meaning: string;
  conditions: string;
  example: string;
  commonMistake: string;
  relatedPyq: string;
}

export interface ChemistryReaction {
  id: string;
  chapter: string;
  name: string;
  reactant: string;
  reagent: string;
  condition: string;
  product: string;
  mechanismType: string;
  keyRule: string;
  pyqFrequency: string;
}

export interface MedicalAwarenessArticle {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  source: string;
  disclaimer: string;
}

export interface MedicalCollege {
  id: string;
  name: string;
  state: string;
  city: string;
  type: 'Central / AIIMS' | 'State Government' | 'Deemed / Trust';
  course: 'MBBS' | 'BDS';
  totalMbbsSeats: number;
  approxGovtFeePerYear: string;
  officialWebsite: string;
  counsellingAuthority: 'MCC (15% AIQ & 100% Central/Deemed)' | 'State Counselling Authority';
  establishedYear: number;
  source: string;
  lastVerified: string;
}
