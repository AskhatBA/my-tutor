import { Button, Checkbox, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { generateOptionId, type MultipleChoiceQuestion } from '@/entities/test';
import { OptionRow } from './OptionRow';

interface MultipleChoiceEditorProps {
  value: MultipleChoiceQuestion;
  onChange: (next: MultipleChoiceQuestion) => void;
}

export function MultipleChoiceEditor({ value, onChange }: MultipleChoiceEditorProps) {
  const updateOptionText = (id: string, text: string) => {
    onChange({
      ...value,
      options: value.options.map((o) => (o.id === id ? { ...o, text } : o)),
    });
  };

  const removeOption = (id: string) => {
    onChange({
      ...value,
      options: value.options.filter((o) => o.id !== id),
      correctOptionIds: value.correctOptionIds.filter((cid) => cid !== id),
    });
  };

  const toggleCorrect = (id: string, checked: boolean) => {
    onChange({
      ...value,
      correctOptionIds: checked
        ? [...value.correctOptionIds, id]
        : value.correctOptionIds.filter((cid) => cid !== id),
    });
  };

  const addOption = () => {
    onChange({
      ...value,
      options: [...value.options, { id: generateOptionId(), text: '' }],
    });
  };

  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>Варианты (отметьте правильные)</Text>
      <Stack gap="xs">
        {value.options.map((option) => (
          <OptionRow
            key={option.id}
            option={option}
            control={
              <Checkbox
                checked={value.correctOptionIds.includes(option.id)}
                onChange={(e) => toggleCorrect(option.id, e.currentTarget.checked)}
              />
            }
            canRemove={value.options.length > 2}
            onTextChange={(text) => updateOptionText(option.id, text)}
            onRemove={() => removeOption(option.id)}
          />
        ))}
      </Stack>
      <Button
        variant="subtle"
        leftSection={<IconPlus size={14} />}
        onClick={addOption}
        size="xs"
        style={{ alignSelf: 'flex-start' }}
      >
        Добавить вариант
      </Button>
    </Stack>
  );
}
