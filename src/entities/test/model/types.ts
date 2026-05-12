import type { BaseEntity } from '@/shared/types';

export type TestDifficulty = 'easy' | 'medium' | 'hard';

export type AttemptStatus = 'pending' | 'in_progress' | 'completed';

export type QuestionType = 'single-choice' | 'multiple-choice' | 'text';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface SingleChoiceQuestion {
  id: string;
  type: 'single-choice';
  text: string;
  points: number;
  options: QuestionOption[];
  correctOptionId: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  text: string;
  points: number;
  options: QuestionOption[];
  correctOptionIds: string[];
}

export interface TextQuestion {
  id: string;
  type: 'text';
  text: string;
  points: number;
  correctAnswer: string;
  caseSensitive: boolean;
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | TextQuestion;

export interface Test extends BaseEntity {
  title: string;
  subject: string;
  difficulty: TestDifficulty;
  category: string;
  tag: string;
  comment?: string;
  isFavorite: boolean;
  isSystem: boolean;
  teacherId?: string;
  assignedStudentIds: string[];
  attempts: TestAttempt[];
  questions?: Question[];
  timeLimit?: number;
}

export interface AttemptAnswer {
  questionId: string;
  questionText: string;
  type: QuestionType;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface TestAttempt {
  studentId: string;
  status: AttemptStatus;
  score: number;
  correctCount: number;
  totalCount: number;
  startedAt: Date | null;
  submittedAt: Date | null;
  answers: AttemptAnswer[];
}

export type TestDraft = Omit<
  Test,
  'id' | 'createdAt' | 'updatedAt' | 'isFavorite' | 'isSystem' | 'assignedStudentIds' | 'attempts'
>;
