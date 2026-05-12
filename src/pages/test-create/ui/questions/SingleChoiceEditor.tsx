import { Button, Radio, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { generateOptionId, type SingleChoiceQuestion } from '@/entities/test';
import { OptionRow } from './OptionRow';

interface SingleChoiceEditorProps {
  value: SingleChoiceQuestion;
  onChange: (next: SingleChoiceQuestion) => void;
}

export function SingleChoiceEditor({ value, onChange }: SingleChoiceEditorProps) {
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
      correctOptionId: value.correctOptionId === id ? '' : value.correctOptionId,
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
      <Radio.Group
        label="Варианты (выберите правильный)"
        value={value.correctOptionId}
        onChange={(id) => onChange({ ...value, correctOptionId: id })}
      >
        <Stack gap="xs" mt="xs">
          {value.options.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              control={<Radio value={option.id} />}
              canRemove={value.options.length > 2}
              onTextChange={(text) => updateOptionText(option.id, text)}
              onRemove={() => removeOption(option.id)}
            />
          ))}
        </Stack>
      </Radio.Group>
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
