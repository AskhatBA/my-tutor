import {
  ActionIcon,
  Badge,
  Card,
  Group,
  NumberInput,
  Stack,
  Textarea,
  Tooltip,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { DEFAULT_QUESTION_POINTS, QUESTION_TYPE_LABEL, type Question } from '@/entities/test';
import { QuestionEditor } from './questions/QuestionEditor';

interface QuestionCardProps {
  index: number;
  question: Question;
  onChange: (next: Question) => void;
  onRemove: () => void;
}

export function QuestionCard({ index, question, onChange, onRemove }: QuestionCardProps) {
  const handlePointsChange = (value: number | string) => {
    const next = typeof value === 'number' && value >= 1 ? value : DEFAULT_QUESTION_POINTS;

    onChange({ ...question, points: next });
  };

  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Group gap="xs">
            <Badge variant="light">Вопрос {index + 1}</Badge>
            <Badge variant="outline">{QUESTION_TYPE_LABEL[question.type]}</Badge>
          </Group>
          <Group gap="xs" align="center" wrap="nowrap">
            <NumberInput
              label="Баллы"
              value={question.points}
              onChange={handlePointsChange}
              min={1}
              step={1}
              allowDecimal={false}
              allowNegative={false}
              w={110}
              size="xs"
            />
            <Tooltip label="Удалить вопрос">
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={onRemove}
                aria-label="remove question"
                mt={22}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <Textarea
          label="Текст вопроса"
          placeholder="Введите вопрос"
          value={question.text}
          onChange={(e) => onChange({ ...question, text: e.currentTarget.value })}
          autosize
          minRows={2}
        />
        <QuestionEditor value={question} onChange={onChange} />
      </Stack>
    </Card>
  );
}
