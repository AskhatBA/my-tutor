import type { BaseEntity } from '@/shared/types';

export type TestDifficulty = 'easy' | 'medium' | 'hard';

export type AttemptStatus = 'pending' | 'in_progress' | 'completed';

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

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'true-false';
  options?: string[];
  correctAnswer: string | string[];
}

export interface AttemptAnswer {
  questionId: string;
  questionText: string;
  type: 'multiple-choice' | 'text' | 'true-false';
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
