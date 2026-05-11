import type { TestDifficulty } from './types';

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
