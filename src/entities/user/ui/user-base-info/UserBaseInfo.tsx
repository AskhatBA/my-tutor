import { Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { useUser } from '../../lib/useUser';

export const UserBaseInfo = () => {
  const { user } = useUser();

  const displayName = user?.name ?? 'Анна Смирнова';

  const displayRole = user?.role === 'teacher' ? 'Преподаватель' : user?.role === 'student' ? 'Ученик' : '—';

  return (
    <Paper
      radius="lg"
      p="sm"
      withBorder={false}
      style={{ background: 'var(--mantine-color-default-hover)', marginBottom: 16 }}
    >
      <Group gap="sm" align="center">
        <Avatar radius="xl" src={user?.avatar} color="blue">
          {displayName.slice(0, 1)}
        </Avatar>
        <Box>
          <Text fw={600} size="sm">
            {displayName}
          </Text>
          <Text size="xs" c="dimmed">
            {displayRole}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
};
