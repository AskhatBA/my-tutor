import { Stack, Text, Title } from '@mantine/core'

interface Props {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ title, description, icon, action }: Props) {
  return (
    <Stack align="center" justify="center" gap="md" py="xl">
      {icon}
      <Title order={3}>{title}</Title>
      {description && (
        <Text c="dimmed" ta="center">
          {description}
        </Text>
      )}
      {action}
    </Stack>
  )
}
