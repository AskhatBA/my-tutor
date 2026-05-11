import { useState } from 'react';
import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DIFFICULTY_OPTIONS, type Test, type TestDraft, type TestDifficulty } from '@/entities/test';

interface TestFormModalProps {
  opened: boolean;
  initialTest: Test | null;
  onClose: () => void;
  onSubmit: (draft: TestDraft) => void;
}

const emptyDraft: TestDraft = {
  title: '',
  subject: '',
  difficulty: 'easy',
  category: '',
  tag: '',
  comment: '',
};

const testToDraft = (test: Test | null): TestDraft =>
  test
    ? {
      title: test.title,
      subject: test.subject,
      difficulty: test.difficulty,
      category: test.category,
      tag: test.tag,
      comment: test.comment ?? '',
    }
    : emptyDraft;

export function TestFormModal({ opened, initialTest, onClose, onSubmit }: TestFormModalProps) {
  const [draft, setDraft] = useState<TestDraft>(() => testToDraft(initialTest));

  const [syncKey, setSyncKey] = useState<string | null>(opened ? (initialTest?.id ?? 'new') : null);

  const targetKey = opened ? (initialTest?.id ?? 'new') : null;

  if (syncKey !== targetKey) {
    setSyncKey(targetKey);

    if (opened) setDraft(testToDraft(initialTest));
  }

  const canSubmit = draft.title.trim() !== '' && draft.subject.trim() !== '';

  const handleSubmit = () => {
    if (!canSubmit) return;

    onSubmit(draft);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialTest ? 'Редактировать тест' : 'Новый тест'}
      size="lg"
      centered
    >
      <Stack gap="sm">
        <TextInput
          label="Название"
          placeholder="Название теста"
          value={draft.title}
          onChange={(e) => setDraft((d) => ({ ...d, title: e.currentTarget.value }))}
          required
        />
        <TextInput
          label="Предмет"
          placeholder="Например, Английский язык"
          value={draft.subject}
          onChange={(e) => setDraft((d) => ({ ...d, subject: e.currentTarget.value }))}
          required
        />
        <Select
          label="Сложность"
          data={DIFFICULTY_OPTIONS}
          value={draft.difficulty}
          onChange={(v) => v && setDraft((d) => ({ ...d, difficulty: v as TestDifficulty }))}
          allowDeselect={false}
        />
        <TextInput
          label="Категория"
          placeholder="Грамматика, Лексика, ..."
          value={draft.category}
          onChange={(e) => setDraft((d) => ({ ...d, category: e.currentTarget.value }))}
        />
        <TextInput
          label="Тэг"
          placeholder="grammar, vocabulary, ..."
          value={draft.tag}
          onChange={(e) => setDraft((d) => ({ ...d, tag: e.currentTarget.value }))}
        />
        <Textarea
          label="Комментарий"
          placeholder="Дополнительная информация о тесте"
          value={draft.comment}
          onChange={(e) => setDraft((d) => ({ ...d, comment: e.currentTarget.value }))}
          autosize
          minRows={2}
        />
        <Group justify="flex-end" mt="sm">
          <Button variant="default" onClick={onClose}>Отмена</Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {initialTest ? 'Сохранить' : 'Создать'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
