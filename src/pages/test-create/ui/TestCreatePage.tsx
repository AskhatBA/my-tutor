import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Card,
  Group,
  Menu,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconDeviceFloppy, IconPlus } from '@tabler/icons-react';
import {
  DIFFICULTY_OPTIONS,
  QUESTION_TYPES,
  useTestStore,
  type Question,
  type TestDifficulty,
  type TestDraft,
} from '@/entities/test';
import { Routes } from '@/shared/constants';
import { QuestionCard } from './QuestionCard';

const emptyDraft: Omit<TestDraft, 'questions'> = {
  title: '',
  subject: '',
  difficulty: 'easy',
  category: '',
  tag: '',
  comment: '',
};

export function TestCreatePage() {
  const navigate = useNavigate();

  const createTest = useTestStore((s) => s.createTest);

  const [metadata, setMetadata] = useState(emptyDraft);

  const [questions, setQuestions] = useState<Question[]>([]);

  const canSave = metadata.title.trim() !== '' && metadata.subject.trim() !== '';

  const goBack = () => navigate(Routes.Tests);

  const addQuestion = (factory: () => Question) => {
    setQuestions((qs) => [...qs, factory()]);
  };

  const updateQuestion = (id: string, next: Question) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? next : q)));
  };

  const removeQuestion = (id: string) => {
    setQuestions((qs) => qs.filter((q) => q.id !== id));
  };

  const handleSave = () => {
    if (!canSave) return;

    createTest({ ...metadata, questions });
    goBack();
  };

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Breadcrumbs>
          <Anchor component="button" onClick={goBack}>Тесты</Anchor>
          <Text c="dimmed">Новый тест</Text>
        </Breadcrumbs>

        <Group justify="space-between" align="center">
          <Group gap="xs">
            <ActionIcon variant="subtle" onClick={goBack} aria-label="back">
              <IconArrowLeft size={18} />
            </ActionIcon>
            <Title order={2}>Создание теста</Title>
          </Group>
          <Group gap="xs">
            <Button variant="default" onClick={goBack}>Отмена</Button>
            <Button
              leftSection={<IconDeviceFloppy size={16} />}
              onClick={handleSave}
              disabled={!canSave}
            >
              Сохранить
            </Button>
          </Group>
        </Group>
      </Stack>

      <Paper withBorder radius="md" p="md">
        <Stack gap="sm">
          <Title order={4}>Основные данные</Title>
          <TextInput
            label="Название"
            placeholder="Название теста"
            value={metadata.title}
            onChange={(e) => setMetadata((m) => ({ ...m, title: e.currentTarget.value }))}
            required
          />
          <TextInput
            label="Предмет"
            placeholder="Например, Английский язык"
            value={metadata.subject}
            onChange={(e) => setMetadata((m) => ({ ...m, subject: e.currentTarget.value }))}
            required
          />
          <Select
            label="Сложность"
            data={DIFFICULTY_OPTIONS}
            value={metadata.difficulty}
            onChange={(v) => v && setMetadata((m) => ({ ...m, difficulty: v as TestDifficulty }))}
            allowDeselect={false}
          />
          <TextInput
            label="Категория"
            placeholder="Грамматика, Лексика, ..."
            value={metadata.category}
            onChange={(e) => setMetadata((m) => ({ ...m, category: e.currentTarget.value }))}
          />
          <TextInput
            label="Тэг"
            placeholder="grammar, vocabulary, ..."
            value={metadata.tag}
            onChange={(e) => setMetadata((m) => ({ ...m, tag: e.currentTarget.value }))}
          />
          <Textarea
            label="Комментарий"
            placeholder="Дополнительная информация о тесте"
            value={metadata.comment}
            onChange={(e) => setMetadata((m) => ({ ...m, comment: e.currentTarget.value }))}
            autosize
            minRows={2}
          />
        </Stack>
      </Paper>

      <Paper withBorder radius="md" p="md">
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Group gap="sm" align="baseline">
              <Title order={4}>Вопросы ({questions.length})</Title>
              {questions.length > 0 && (
                <Text size="sm" c="dimmed">
                  Всего баллов: {questions.reduce((sum, q) => sum + q.points, 0)}
                </Text>
              )}
            </Group>
            <Menu shadow="md" position="bottom-end" withinPortal>
              <Menu.Target>
                <Button leftSection={<IconPlus size={16} />} variant="light">
                  Добавить вопрос
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {QUESTION_TYPES.map((meta) => (
                  <Menu.Item
                    key={meta.type}
                    onClick={() => addQuestion(meta.create)}
                  >
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{meta.label}</Text>
                      <Text size="xs" c="dimmed">{meta.description}</Text>
                    </Stack>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>

          {questions.length === 0 ? (
            <Card withBorder radius="md" p="lg">
              <Text c="dimmed" ta="center" size="sm">
                Пока нет вопросов. Нажмите «Добавить вопрос», чтобы начать.
              </Text>
            </Card>
          ) : (
            <Stack gap="md">
              {questions.map((question, idx) => (
                <QuestionCard
                  key={question.id}
                  index={idx}
                  question={question}
                  onChange={(next) => updateQuestion(question.id, next)}
                  onRemove={() => removeQuestion(question.id)}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
