import { Group, Burger, Menu, Avatar, Text, UnstyledButton, ActionIcon, useMantineColorScheme, useComputedColorScheme, Tooltip, Image } from '@mantine/core';
import { Sun, Moon } from 'lucide-react';
import { useAuth } from '@/features/auth/lib/useAuth';
import logo from '@/assets/logo.svg';

interface Props {
  opened: boolean
  toggle: () => void
}

export function Header({ opened, toggle }: Props) {
  const { user, logout } = useAuth();

  const { setColorScheme } = useMantineColorScheme();

  const computedColorScheme = useComputedColorScheme('light');

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group gap="xs" align="center">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-expect-error*/}
          <Image src={logo} alt="MyTutor logo" h={28} w="auto" fit="contain" styles={{ image: { display: 'block' } }} />
        </Group>
      </Group>

      <Group>
        <Tooltip label={computedColorScheme === 'light' ? 'Темная тема' : 'Светлая тема'}>
          <ActionIcon
            variant="subtle"
            aria-label="Toggle color scheme"
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          >
            {computedColorScheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </ActionIcon>
        </Tooltip>

        {user && (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar src={user.avatar} radius="xl" size="sm" />
                  <Text size="sm" fw={500}>{user.name}</Text>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Аккаунт</Menu.Label>
              <Menu.Item>Профиль</Menu.Item>
              <Menu.Item>Настройки</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" onClick={logout}>
                Выйти
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Group>
  );
}
