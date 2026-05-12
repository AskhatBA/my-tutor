import type { ReactNode } from 'react';
import { ActionIcon, Group, TextInput } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import type { QuestionOption } from '@/entities/test';

interface OptionRowProps {
  option: QuestionOption;
  control: ReactNode;
  canRemove: boolean;
  onTextChange: (text: string) => void;
  onRemove: () => void;
}

export function OptionRow({ option, control, canRemove, onTextChange, onRemove }: OptionRowProps) {
  return (
    <Group gap="xs" wrap="nowrap" align="center">
      {control}
      <TextInput
        flex={1}
        placeholder="Вариант ответа"
        value={option.text}
        onChange={(e) => onTextChange(e.currentTarget.value)}
      />
      <ActionIcon
        variant="subtle"
        color="red"
        onClick={onRemove}
        disabled={!canRemove}
        aria-label="remove option"
      >
        <IconX size={16} />
      </ActionIcon>
    </Group>
  );
}
