import { create } from 'zustand';
import type { Test, TestDraft } from './types';

interface TestStore {
  myTests: Test[];
  systemTests: Test[];
  createTest: (draft: TestDraft) => void;
  updateTest: (id: string, draft: TestDraft) => void;
  deleteTest: (id: string) => void;
  toggleFavorite: (id: string) => void;
  copySystemTestToMine: (id: string) => void;
  assignToStudents: (id: string, studentIds: string[]) => void;
  unassignStudent: (id: string, studentId: string) => void;
}

const now = () => new Date();

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36)
      .slice(2);

const initialMyTests: Test[] = [
  {
    id: 'my-1',
    title: 'Контрольная по Present Simple',
    subject: 'Английский язык',
    difficulty: 'easy',
    category: 'Грамматика',
    tag: 'grammar',
    comment: 'Для 5-6 классов, базовый уровень',
    isFavorite: true,
    isSystem: false,
    assignedStudentIds: [],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'my-2',
    title: 'Лексика: Travel & Tourism',
    subject: 'Английский язык',
    difficulty: 'medium',
    category: 'Лексика',
    tag: 'vocabulary',
    comment: '',
    isFavorite: false,
    isSystem: false,
    assignedStudentIds: [],
    createdAt: now(),
    updatedAt: now(),
  },
];

const initialSystemTests: Test[] = [
  {
    id: 'sys-1',
    title: 'Определение уровня английского (A1–C1)',
    subject: 'Английский язык',
    difficulty: 'medium',
    category: 'Placement',
    tag: 'level-test',
    comment: 'Базовый тест для определения уровня CEFR',
    isFavorite: false,
    isSystem: true,
    assignedStudentIds: [],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'sys-2',
    title: 'Тест на знание базовой грамматики',
    subject: 'Английский язык',
    difficulty: 'easy',
    category: 'Грамматика',
    tag: 'grammar',
    comment: 'Времена, артикли, предлоги',
    isFavorite: false,
    isSystem: true,
    assignedStudentIds: [],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'sys-3',
    title: 'Soft skills: оценка коммуникации',
    subject: 'Общее',
    difficulty: 'medium',
    category: 'Навыки',
    tag: 'soft-skills',
    comment: '',
    isFavorite: false,
    isSystem: true,
    assignedStudentIds: [],
    createdAt: now(),
    updatedAt: now(),
  },
];

export const useTestStore = create<TestStore>((set) => ({
  myTests: initialMyTests,
  systemTests: initialSystemTests,

  createTest: (draft) =>
    set((state) => ({
      myTests: [
        ...state.myTests,
        {
          ...draft,
          id: generateId(),
          isFavorite: false,
          isSystem: false,
          assignedStudentIds: [],
          createdAt: now(),
          updatedAt: now(),
        },
      ],
    })),

  updateTest: (id, draft) =>
    set((state) => ({
      myTests: state.myTests.map((t) =>
        t.id === id ? { ...t, ...draft, updatedAt: now() } : t,
      ),
    })),

  deleteTest: (id) =>
    set((state) => ({
      myTests: state.myTests.filter((t) => t.id !== id),
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      myTests: state.myTests.map((t) =>
        t.id === id ? { ...t, isFavorite: !t.isFavorite, updatedAt: now() } : t,
      ),
    })),

  copySystemTestToMine: (id) =>
    set((state) => {
      const source = state.systemTests.find((t) => t.id === id);

      if (!source) return state;

      const alreadyCopied = state.myTests.some(
        (t) => t.tag === source.tag && t.title === source.title,
      );

      if (alreadyCopied) return state;

      return {
        myTests: [
          ...state.myTests,
          {
            ...source,
            id: generateId(),
            isSystem: false,
            isFavorite: false,
            assignedStudentIds: [],
            createdAt: now(),
            updatedAt: now(),
          },
        ],
      };
    }),

  assignToStudents: (id, studentIds) =>
    set((state) => ({
      myTests: state.myTests.map((t) =>
        t.id === id
          ? {
            ...t,
            assignedStudentIds: Array.from(new Set([...t.assignedStudentIds, ...studentIds])),
            updatedAt: now(),
          }
          : t,
      ),
    })),

  unassignStudent: (id, studentId) =>
    set((state) => ({
      myTests: state.myTests.map((t) =>
        t.id === id
          ? {
            ...t,
            assignedStudentIds: t.assignedStudentIds.filter((s) => s !== studentId),
            updatedAt: now(),
          }
          : t,
      ),
    })),
}));
