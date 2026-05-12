import { Stack, Switch, TextInput } from '@mantine/core';
import type { TextQuestion } from '@/entities/test';

interface TextQuestionEditorProps {
  value: TextQuestion;
  onChange: (next: TextQuestion) => void;
}

export function TextQuestionEditor({ value, onChange }: TextQuestionEditorProps) {
  return (
    <Stack gap="sm">
      <TextInput
        label="Правильный ответ"
        placeholder="Что должен ввести ученик"
        value={value.correctAnswer}
        onChange={(e) => onChange({ ...value, correctAnswer: e.currentTarget.value })}
      />
      <Switch
        label="Учитывать регистр"
        checked={value.caseSensitive}
        onChange={(e) => onChange({ ...value, caseSensitive: e.currentTarget.checked })}
      />
    </Stack>
  );
}
