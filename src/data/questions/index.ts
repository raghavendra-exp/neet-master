import { Question } from '../../types';
import physicsData from './physics-questions.json';
import chemistryData from './chemistry-questions.json';
import biologyData from './biology-questions.json';

export const allQuestions: Question[] = [
  ...(physicsData as Question[]),
  ...(chemistryData as Question[]),
  ...(biologyData as Question[])
];

export const physicsQuestions: Question[] = physicsData as Question[];
export const chemistryQuestions: Question[] = chemistryData as Question[];
export const biologyQuestions: Question[] = biologyData as Question[];

export const verifiedPyqs: Question[] = allQuestions.filter(q => q.isVerifiedPyq);

export const questionStats = {
  total: allQuestions.length,
  physics: physicsQuestions.length,
  chemistry: chemistryQuestions.length,
  biology: biologyQuestions.length,
  pyqs: verifiedPyqs.length,
  easy: allQuestions.filter(q => q.difficulty === 'easy').length,
  medium: allQuestions.filter(q => q.difficulty === 'medium').length,
  hard: allQuestions.filter(q => q.difficulty === 'hard').length,
};
