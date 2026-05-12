import type { AttemptAnswer, AttemptStatus, QuestionType, TestAttempt } from './types';

interface QuestionSeed {
  q: string;
  a: string;
  type: QuestionType;
  options?: string[];
}

const QUESTION_POOL: Record<string, QuestionSeed[]> = {
  grammar: [
    {
      q: 'She ___ to school every day.',
      a: 'goes',
      type: 'single-choice',
      options: ['go', 'goes', 'going', 'gone'],
    },
    {
      q: 'There ___ many books on the shelf.',
      a: 'are',
      type: 'single-choice',
      options: ['is', 'are', 'be', 'am'],
    },
    {
      q: 'I have lived here ___ 2010.',
      a: 'since',
      type: 'single-choice',
      options: ['for', 'since', 'from', 'at'],
    },
    {
      q: 'If I ___ rich, I would travel.',
      a: 'were',
      type: 'single-choice',
      options: ['am', 'was', 'were', 'be'],
    },
    {
      q: 'He doesn\'t like ___ coffee.',
      a: 'drinking',
      type: 'single-choice',
      options: ['drink', 'drinking', 'to drinking', 'drunk'],
    },
  ],
  vocabulary: [
    {
      q: 'A person who travels for pleasure is a...',
      a: 'tourist',
      type: 'single-choice',
      options: ['tourist', 'driver', 'pilot', 'guide'],
    },
    {
      q: 'Документ для поездок за границу (англ.)',
      a: 'passport',
      type: 'text',
    },
    {
      q: 'A place where you stay during a trip',
      a: 'hotel',
      type: 'single-choice',
      options: ['hotel', 'station', 'airport', 'museum'],
    },
    {
      q: 'Synonym for "journey"',
      a: 'trip',
      type: 'text',
    },
  ],
  'level-test': [
    {
      q: 'Choose the correct sentence.',
      a: 'I have been to Paris.',
      type: 'single-choice',
      options: ['I have been to Paris.', 'I am been to Paris.', 'I been to Paris.', 'I has been to Paris.'],
    },
    {
      q: 'Past form of "go"',
      a: 'went',
      type: 'text',
    },
    {
      q: '"Despite" is followed by...',
      a: 'a noun or -ing',
      type: 'single-choice',
      options: ['a noun or -ing', 'a clause', 'an infinitive', 'an adjective'],
    },
    {
      q: 'CEFR уровень B2 это:',
      a: 'Upper-Intermediate',
      type: 'single-choice',
      options: ['Beginner', 'Intermediate', 'Upper-Intermediate', 'Advanced'],
    },
  ],
  'soft-skills': [
    {
      q: 'Активное слушание включает в себя:',
      a: 'парафраз и уточняющие вопросы',
      type: 'single-choice',
      options: [
        'парафраз и уточняющие вопросы',
        'перебивание собеседника',
        'выражение несогласия',
        'молчание',
      ],
    },
    {
      q: 'Метод "Я-сообщения" используется для:',
      a: 'выражения чувств без обвинения',
      type: 'single-choice',
      options: [
        'выражения чувств без обвинения',
        'критики собеседника',
        'отказа от диалога',
        'манипуляции',
      ],
    },
    {
      q: 'Конструктивная критика — это:',
      a: 'обратная связь с примерами и решениями',
      type: 'single-choice',
      options: [
        'обратная связь с примерами и решениями',
        'указание на недостатки',
        'эмоциональная реакция',
        'игнорирование проблемы',
      ],
    },
  ],
  default: [
    { q: 'Вопрос 1', a: 'A', type: 'single-choice', options: ['A', 'B', 'C', 'D'] },
    { q: 'Вопрос 2', a: 'B', type: 'single-choice', options: ['A', 'B', 'C', 'D'] },
    { q: 'Вопрос 3', a: 'C', type: 'single-choice', options: ['A', 'B', 'C', 'D'] },
    { q: 'Вопрос 4', a: 'D', type: 'single-choice', options: ['A', 'B', 'C', 'D'] },
  ],
};

const WRONG_TEXT_ANSWERS = ['не знаю', 'visa', 'voyage', 'travel', '—'];

const pickQuestions = (tag: string): QuestionSeed[] => {
  const pool = QUESTION_POOL[tag] ?? QUESTION_POOL.default;

  return pool.slice(0, Math.min(4, pool.length));
};

const buildAnswer = (seed: QuestionSeed, idx: number, isCorrect: boolean): AttemptAnswer => {
  let studentAnswer: string;

  if (isCorrect) {
    studentAnswer = seed.a;
  } else if (seed.options) {
    studentAnswer = seed.options.find((o) => o !== seed.a) ?? seed.a;
  } else {
    studentAnswer = WRONG_TEXT_ANSWERS[idx % WRONG_TEXT_ANSWERS.length];
  }

  return {
    questionId: `q-${idx}`,
    questionText: seed.q,
    type: seed.type,
    studentAnswer,
    correctAnswer: seed.a,
    isCorrect,
  };
};

const randomStatus = (): AttemptStatus => {
  const r = Math.random();

  if (r < 0.7) return 'completed';

  if (r < 0.9) return 'in_progress';

  return 'pending';
};

const hoursAgo = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000);

export const generateMockAttempt = (
  studentId: string,
  tag: string,
  status?: AttemptStatus,
): TestAttempt => {
  const seeds = pickQuestions(tag);

  const resolvedStatus = status ?? randomStatus();

  const totalCount = seeds.length;

  if (resolvedStatus === 'pending') {
    return {
      studentId,
      status: 'pending',
      score: 0,
      correctCount: 0,
      totalCount,
      startedAt: null,
      submittedAt: null,
      answers: [],
    };
  }

  const fullAnswers = seeds.map((seed, idx) => buildAnswer(seed, idx, Math.random() < 0.7));

  if (resolvedStatus === 'in_progress') {
    const partialCount = 1 + Math.floor(Math.random() * Math.max(1, totalCount - 1));

    const partial = fullAnswers.slice(0, partialCount);

    return {
      studentId,
      status: 'in_progress',
      score: 0,
      correctCount: partial.filter((a) => a.isCorrect).length,
      totalCount,
      startedAt: hoursAgo(1 + Math.floor(Math.random() * 6)),
      submittedAt: null,
      answers: partial,
    };
  }

  const correctCount = fullAnswers.filter((a) => a.isCorrect).length;

  return {
    studentId,
    status: 'completed',
    score: correctCount / totalCount,
    correctCount,
    totalCount,
    startedAt: hoursAgo(24 + Math.floor(Math.random() * 48)),
    submittedAt: hoursAgo(Math.floor(Math.random() * 24)),
    answers: fullAnswers,
  };
};
