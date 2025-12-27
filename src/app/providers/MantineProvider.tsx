import { MantineProvider as BaseMantineProvider, localStorageColorSchemeManager } from '@mantine/core';
import { theme } from '../styles/mantine-theme';

interface Props {
  children: React.ReactNode
}

export function MantineProvider({ children }: Props) {
  const colorSchemeManager = localStorageColorSchemeManager({ key: 'mytutor-color-scheme' })
  return (
    <BaseMantineProvider
      theme={theme}
      defaultColorScheme="light"
      colorSchemeManager={colorSchemeManager}
    >
      {children}
    </BaseMantineProvider>
  );
}
