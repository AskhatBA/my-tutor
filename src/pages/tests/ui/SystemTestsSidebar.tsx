import { Badge, Button, Card, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { DIFFICULTY_COLOR, DIFFICULTY_LABEL, type Test } from '@/entities/test';

interface SystemTestsSidebarProps {
  tests: Test[];
  myTagSet: Set<string>;
  onAdd: (id: string) => void;
}

export function SystemTestsSidebar({ tests, myTagSet, onAdd }: SystemTestsSidebarProps) {
  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="sm">
        <Stack gap={2}>
          <Title order={4}>Системные тесты</Title>
          <Text size="xs" c="dimmed">
            Базовые тесты в системе — добавьте в свой список
          </Text>
        </Stack>

        {tests.map((test) => {
          const alreadyAdded = myTagSet.has(test.tag + '|' + test.title);

          return (
            <Card key={test.id} withBorder radius="md" p="sm">
              <Stack gap={6}>
                <Text fw={600} size="sm" lineClamp={2}>{test.title}</Text>
                <Group gap={6} wrap="wrap">
                  <Badge variant="light" size="sm">{test.subject}</Badge>
                  <Badge variant="light" size="sm" color={DIFFICULTY_COLOR[test.difficulty]}>
                    {DIFFICULTY_LABEL[test.difficulty]}
                  </Badge>
                </Group>
                {test.comment && (
                  <Text size="xs" c="dimmed" lineClamp={2}>{test.comment}</Text>
                )}
                <Button
                  size="xs"
                  variant="light"
                  leftSection={<IconPlus size={14} />}
                  onClick={() => onAdd(test.id)}
                  disabled={alreadyAdded}
                  mt={4}
                >
                  {alreadyAdded ? 'Уже добавлен' : 'Добавить к себе'}
                </Button>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Paper>
  );
}
