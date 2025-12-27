import { Card, Group, Text, Avatar, Progress, Badge } from '@mantine/core'
import type { Student } from '../model/types'

interface Props {
  student: Student
  onClick?: () => void
}

export function StudentCard({ student, onClick }: Props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <Group justify="space-between" mb="xs">
        <Group>
          <Avatar src={student.avatar} radius="xl" />
          <div>
            <Text fw={500}>{student.name}</Text>
            <Text size="sm" c="dimmed">
              {student.email}
            </Text>
          </div>
        </Group>
        <Badge color="blue">{student.level}</Badge>
      </Group>

      <Text size="sm" c="dimmed" mb="xs">
        Прогресс: {student.completedLessons}/{student.totalLessons} уроков
      </Text>
      <Progress value={student.progress} size="sm" />
    </Card>
  )
}
