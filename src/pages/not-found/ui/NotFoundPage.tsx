import { Container, Title, Text, Button, Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Container size="sm" style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <Title order={1} size="5rem">404</Title>
      <Title order={2} mb="md">Страница не найдена</Title>
      <Text c="dimmed" mb="xl">
        К сожалению, запрашиваемая страница не существует.
      </Text>
      <Group justify="center">
        <Button onClick={() => navigate(-1)}>Назад</Button>
        <Button variant="light" onClick={() => navigate('/')}>
          На главную
        </Button>
      </Group>
    </Container>
  )
}
