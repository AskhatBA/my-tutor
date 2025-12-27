import { Container, Title, SimpleGrid, Paper, Text } from '@mantine/core'

export function DashboardPage() {
  return (
    <Container size="xl">
      <Title mb="xl">Панель преподавателя</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Text size="xl" fw={700}>12</Text>
          <Text c="dimmed">Студентов</Text>
        </Paper>
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Text size="xl" fw={700}>45</Text>
          <Text c="dimmed">Уроков проведено</Text>
        </Paper>
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Text size="xl" fw={700}>8</Text>
          <Text c="dimmed">Предстоящих занятий</Text>
        </Paper>
      </SimpleGrid>
    </Container>
  )
}
