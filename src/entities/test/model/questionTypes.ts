import type {
  MultipleChoiceQuestion,
  Question,
  QuestionType,
  SingleChoiceQuestion,
  TextQuestion,
} from './types';

const genId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36)
      .slice(2);

const emptyOptions = () => [
  { id: genId(), text: '' },
  { id: genId(), text: '' },
];

export interface QuestionTypeMeta {
  type: QuestionType;
  label: string;
  description: string;
  create: () => Question;
}

export const DEFAULT_QUESTION_POINTS = 1;

const createSingleChoice = (): SingleChoiceQuestion => ({
  id: genId(),
  type: 'single-choice',
  text: '',
  points: DEFAULT_QUESTION_POINTS,
  options: emptyOptions(),
  correctOptionId: '',
});

const createMultipleChoice = (): MultipleChoiceQuestion => ({
  id: genId(),
  type: 'multiple-choice',
  text: '',
  points: DEFAULT_QUESTION_POINTS,
  options: emptyOptions(),
  correctOptionIds: [],
});

const createText = (): TextQuestion => ({
  id: genId(),
  type: 'text',
  text: '',
  points: DEFAULT_QUESTION_POINTS,
  correctAnswer: '',
  caseSensitive: false,
});

export const QUESTION_TYPES: QuestionTypeMeta[] = [
  {
    type: 'single-choice',
    label: 'Один правильный',
    description: 'Радио: ученик выбирает один вариант',
    create: createSingleChoice,
  },
  {
    type: 'multiple-choice',
    label: 'Несколько правильных',
    description: 'Чекбоксы: ученик выбирает несколько вариантов',
    create: createMultipleChoice,
  },
  {
    type: 'text',
    label: 'Текстовый ответ',
    description: 'Ученик вводит ответ свободно',
    create: createText,
  },
];

export const QUESTION_TYPE_LABEL = Object.fromEntries(
  QUESTION_TYPES.map((m) => [m.type, m.label]),
) as Record<QuestionType, string>;

export const getQuestionTypeMeta = (type: QuestionType): QuestionTypeMeta | undefined =>
  QUESTION_TYPES.find((m) => m.type === type);

export const generateOptionId = genId;
