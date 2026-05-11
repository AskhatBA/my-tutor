import { useMemo } from 'react';
import {
  Accordion,
  Avatar,
  Badge,
  Group,
  Modal,
  Paper,
  Progress,
  RingProgress,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import {
  ATTEMPT_STATUS_COLOR,
  ATTEMPT_STATUS_LABEL,
  type Test,
  type TestAttempt,
} from '@/entities/test';
import type { Student } from '@/entities/student/model/types';
import { formatDate } from '@/shared/lib/utils/formatDate';

interface TestResultsModalProps {
  opened: boolean;
  test: Test | null;
  studentsById: Map<string, Student>;
  onClose: () => void;
}

const STATUS_ORDER: Record<string, number> = {
  completed: 0,
  in_progress: 1,
  pending: 2,
};

const formatPercent = (score: number) => `${Math.round(score * 100)}%`;

const formatSubmitted = (date: Date | null) => {
  if (!date) return '—';

  return formatDate(date, 'long');
};

function ScoreSummary({ attempt }: { attempt: TestAttempt }) {
  if (attempt.status === 'pending') {
    return <Text size="sm" c="dimmed">Тест ещё не начат</Text>;
  }

  if (attempt.status === 'in_progress') {
    return (
      <Stack gap={4} w={180}>
        <Text size="sm" c="dimmed">
          Отвечено {attempt.answers.length} из {attempt.totalCount}
        </Text>
        <Progress
          value={(attempt.answers.length / attempt.totalCount) * 100}
          color="yellow"
          size="sm"
        />
      </Stack>
    );
  }

  const color = attempt.score >= 0.8 ? 'green' : attempt.score >= 0.5 ? 'yellow' : 'red';

  return (
    <Group gap="sm" wrap="nowrap">
      <RingProgress
        size={64}
        thickness={6}
        sections={[{ value: attempt.score * 100, color }]}
        label={
          <Text ta="center" size="xs" fw={700}>
            {formatPercent(attempt.score)}
          </Text>
        }
      />
      <Stack gap={2}>
        <Text size="sm" fw={600}>
          {attempt.correctCount} / {attempt.totalCount}
        </Text>
        <Text size="xs" c="dimmed">
          Сдан: {formatSubmitted(attempt.submittedAt)}
        </Text>
      </Stack>
    </Group>
  );
}

function AnswersList({ attempt }: { attempt: TestAttempt }) {
  if (attempt.answers.length === 0) {
    return (
      <Text size="sm" c="dimmed">
        Ученик ещё не дал ни одного ответа.
      </Text>
    );
  }

  return (
    <Stack gap="xs">
      {attempt.answers.map((answer, idx) => (
        <Paper key={answer.questionId} withBorder p="sm" radius="sm">
          <Stack gap={6}>
            <Group gap="xs" wrap="nowrap" align="flex-start">
              <ThemeIcon
                size="sm"
                radius="xl"
                color={answer.isCorrect ? 'green' : 'red'}
                variant="light"
              >
                {answer.isCorrect ? <IconCheck size={14} /> : <IconX size={14} />}
              </ThemeIcon>
              <Text size="sm" fw={500}>
                {idx + 1}. {answer.questionText}
              </Text>
            </Group>
            <Group gap="md" pl={32} wrap="wrap">
              <Text size="xs">
                <Text component="span" c="dimmed">Ответ ученика: </Text>
                <Text
                  component="span"
                  c={answer.isCorrect ? 'green' : 'red'}
                  fw={500}
                >
                  {answer.studentAnswer}
                </Text>
              </Text>
              {!answer.isCorrect && (
                <Text size="xs">
                  <Text component="span" c="dimmed">Правильный: </Text>
                  <Text component="span" c="green" fw={500}>
                    {answer.correctAnswer}
                  </Text>
                </Text>
              )}
            </Group>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

export function TestResultsModal({ opened, test, studentsById, onClose }: TestResultsModalProps) {
  const rows = useMemo(() => {
    if (!test) return [];

    return [...test.attempts]
      .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
      .map((attempt) => ({
        attempt,
        student: studentsById.get(attempt.studentId),
      }))
      .filter(
        (row): row is { attempt: TestAttempt; student: Student } => row.student !== undefined,
      );
  }, [test, studentsById]);

  const stats = useMemo(() => {
    if (!test) return null;

    const total = test.attempts.length;

    const completed = test.attempts.filter((a) => a.status === 'completed');

    const avgScore = completed.length === 0
      ? 0
      : completed.reduce((sum, a) => sum + a.score, 0) / completed.length;

    return { total, completed: completed.length, avgScore };
  }, [test]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={test ? `Результаты: ${test.title}` : 'Результаты'}
      size="xl"
      centered
    >
      {test && (
        <Stack gap="md">
          {stats && stats.total > 0 && (
            <Group gap="lg">
              <Stack gap={2}>
                <Text size="xs" c="dimmed">Отправлено ученикам</Text>
                <Text size="lg" fw={700}>{stats.total}</Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">Завершили</Text>
                <Text size="lg" fw={700}>{stats.completed}</Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">Средний балл</Text>
                <Text size="lg" fw={700}>
                  {stats.completed > 0 ? formatPercent(stats.avgScore) : '—'}
                </Text>
              </Stack>
            </Group>
          )}

          {rows.length === 0 ? (
            <Text c="dimmed" size="sm">
              Тест ещё никому не отправлен.
            </Text>
          ) : (
            <Accordion variant="separated" multiple>
              {rows.map(({ attempt, student }) => (
                <Accordion.Item key={attempt.studentId} value={attempt.studentId}>
                  <Accordion.Control>
                    <Group justify="space-between" wrap="nowrap" pr="md">
                      <Group gap="sm" wrap="nowrap">
                        <Avatar size={36} radius="xl" src={student.avatar} name={student.name} />
                        <Stack gap={2}>
                          <Text fw={600} size="sm">{student.name}</Text>
                          <Badge
                            variant="light"
                            size="sm"
                            color={ATTEMPT_STATUS_COLOR[attempt.status]}
                          >
                            {ATTEMPT_STATUS_LABEL[attempt.status]}
                          </Badge>
                        </Stack>
                      </Group>
                      <ScoreSummary attempt={attempt} />
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <AnswersList attempt={attempt} />
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Stack>
      )}
    </Modal>
  );
}
