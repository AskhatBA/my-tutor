import type { AttemptStatus, TestDifficulty } from './types';

export const DIFFICULTY_LABEL: Record<TestDifficulty, string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
};

export const DIFFICULTY_COLOR: Record<TestDifficulty, string> = {
  easy: 'green',
  medium: 'yellow',
  hard: 'red',
};

export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: DIFFICULTY_LABEL.easy },
  { value: 'medium', label: DIFFICULTY_LABEL.medium },
  { value: 'hard', label: DIFFICULTY_LABEL.hard },
];

export const ATTEMPT_STATUS_LABEL: Record<AttemptStatus, string> = {
  pending: 'Ожидает',
  in_progress: 'В процессе',
  completed: 'Завершён',
};

export const ATTEMPT_STATUS_COLOR: Record<AttemptStatus, string> = {
  pending: 'gray',
  in_progress: 'yellow',
  completed: 'green',
};
