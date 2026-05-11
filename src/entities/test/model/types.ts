import type { BaseEntity } from '@/shared/types';

export type TestDifficulty = 'easy' | 'medium' | 'hard';

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

export type TestDraft = Omit<
  Test,
  'id' | 'createdAt' | 'updatedAt' | 'isFavorite' | 'isSystem' | 'assignedStudentIds'
>;
