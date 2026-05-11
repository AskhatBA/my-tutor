import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Menu,
  Pill,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import {
  IconDots,
  IconPencil,
  IconSend,
  IconStar,
  IconStarFilled,
  IconTrash,
} from '@tabler/icons-react';
import { DIFFICULTY_COLOR, DIFFICULTY_LABEL, type Test } from '@/entities/test';
import type { Student } from '@/entities/student/model/types';

interface TestRowProps {
  test: Test;
  assignedStudents: Student[];
  onToggleFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAssign: () => void;
  onUnassign: (studentId: string) => void;
}

export function TestRow({
  test,
  assignedStudents,
  onToggleFavorite,
  onEdit,
  onDelete,
  onAssign,
  onUnassign,
}: TestRowProps) {
  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Stack gap={6} style={{ flex: 1, minWidth: 0 }}>
          <Group gap="xs" wrap="wrap">
            <Text fw={600} size="md" lineClamp={1}>{test.title}</Text>
            <Badge variant="light">{test.subject}</Badge>
            <Badge variant="light" color={DIFFICULTY_COLOR[test.difficulty]}>
              {DIFFICULTY_LABEL[test.difficulty]}
            </Badge>
            {test.category && <Badge variant="outline">{test.category}</Badge>}
            {test.tag && <Badge variant="dot">#{test.tag}</Badge>}
          </Group>
          {test.comment && (
            <Text size="sm" c="dimmed" lineClamp={2}>{test.comment}</Text>
          )}
          {assignedStudents.length > 0 && (
            <Stack gap={4} mt={4}>
              <Text size="xs" c="dimmed">
                Отправлен ({assignedStudents.length}):
              </Text>
              <Group gap={6} wrap="wrap">
                {assignedStudents.map((student) => (
                  <Pill
                    key={student.id}
                    size="sm"
                    withRemoveButton
                    onRemove={() => onUnassign(student.id)}
                  >
                    <Group gap={6} wrap="nowrap" component="span">
                      <Avatar size={16} radius="xl" src={student.avatar} name={student.name} />
                      {student.name}
                    </Group>
                  </Pill>
                ))}
              </Group>
            </Stack>
          )}
        </Stack>

        <Group gap={4} wrap="nowrap">
          <Tooltip label={test.isFavorite ? 'Убрать из избранного' : 'В избранное'}>
            <ActionIcon
              variant="subtle"
              color={test.isFavorite ? 'yellow' : 'gray'}
              onClick={onToggleFavorite}
              aria-label="favorite"
            >
              {test.isFavorite ? <IconStarFilled size={18} /> : <IconStar size={18} />}
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Отправить ученику">
            <ActionIcon variant="subtle" onClick={onAssign} aria-label="assign">
              <IconSend size={18} />
            </ActionIcon>
          </Tooltip>
          <Menu shadow="md" position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon variant="subtle" aria-label="more">
                <IconDots size={18} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconPencil size={16} />} onClick={onEdit}>
                Редактировать
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash size={16} />}
                color="red"
                onClick={onDelete}
              >
                Удалить
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Card>
  );
}
