import { LoadingOverlay } from '@mantine/core'

interface Props {
  visible: boolean
}

export function LoaderOverlay({ visible }: Props) {
  return <LoadingOverlay visible={visible} overlayProps={{ blur: 2 }} />
}
