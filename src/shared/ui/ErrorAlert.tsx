import { Alert } from '@mantine/core'

interface Props {
  title?: string
  message: string
  onClose?: () => void
}

export function ErrorAlert({ title = 'Ошибка', message, onClose }: Props) {
  return (
    <Alert color="red" title={title} withCloseButton={!!onClose} onClose={onClose}>
      {message}
    </Alert>
  )
}
