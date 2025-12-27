import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Group,
  Menu,
  Pagination,
  Paper,
  Progress,
  Select,
  SimpleGrid,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  Download,
  MoreVertical,
  Plus,
  Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type Student = {
  id: string;
  name: string;
  email: string;
  group: string;
  subgroup?: string;
  progress: number; // 0-100
  lastLesson?: string; // ISO date
  score?: number; // 0-5
  status: 'active' | 'risk' | 'inactive';
  avatar?: string;
};

const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Александр Попов',
    email: 'alex.popov@edu.com',
    group: 'English B2',
    subgroup: 'Группа А',
    progress: 75,
    lastLesson: '2023-10-12',
    score: 4.8,
    status: 'active',
  },
  {
    id: '2',
    name: 'Мария Иванова',
    email: 'maria.i@edu.com',
    group: 'English B2',
    subgroup: 'Группа А',
    progress: 92,
    lastLesson: '2023-10-12',
    score: 5.0,
    status: 'active',
  },
  {
    id: '3',
    name: 'Дмитрий Орлов',
    email: 'd.orlov@edu.com',
    group: 'Math Adv',
    subgroup: 'Группа Б',
    progress: 45,
    lastLesson: '2023-10-10',
    score: 3.8,
    status: 'risk',
  },
  {
    id: '4',
    name: 'Екатерина Волкова',
    email: 'e.volkova@edu.com',
    group: 'Spanish A1',
    subgroup: 'Группа C',
    progress: 10,
    lastLesson: '2023-09-25',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Иван Петров',
    email: 'i.petrov@edu.com',
    group: 'Math Adv',
    subgroup: 'Группа Б',
    progress: 88,
    lastLesson: '2023-10-11',
    score: 4.5,
    status: 'active',
  },
];

function StatCard({ label, value, delta, positive }: { label: string; value: string; delta?: string; positive?: boolean }) {
  return (
    <Paper withBorder radius="md" p="lg">
      <Text size="sm" c="dimmed" mb={8}>
        {label}
      </Text>
      <Group gap="xs" align="center">
        <Title order={2}>{value}</Title>
        {delta && (
          <Badge color={positive ? 'green' : 'orange'} variant="light" size="sm">
            {delta}
          </Badge>
        )}
      </Group>
    </Paper>
  );
}

function StatusBadge({ status }: { status: Student['status'] }) {
  if (status === 'active') return <Badge color="green" variant="light">Активный</Badge>;
  if (status === 'risk') return <Badge color="yellow" variant="light">Риск</Badge>;

  return <Badge color="gray" variant="light">Неактивен</Badge>;
}

export function StudentsPage() {
  const [query, setQuery] = useState('');

  const [group, setGroup] = useState<string | null>(null);

  const [status, setStatus] = useState<string | null>(null);

  const [progressFilter, setProgressFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MOCK_STUDENTS.filter((s) => {
      const q = query.trim().toLowerCase();

      const byQuery = !q
        || s.name.toLowerCase().includes(q)
        || s.email.toLowerCase().includes(q)
        || s.id.toLowerCase().includes(q);

      const byGroup = !group || s.group === group;

      const byStatus = !status
        || (status === 'Активные' && s.status === 'active')
        || (status === 'В риске' && s.status === 'risk')
        || (status === 'Неактивные' && s.status === 'inactive');

      const byProgress = !progressFilter
        || (progressFilter === '< 50%' && s.progress < 50)
        || (progressFilter === '50–80%' && s.progress >= 50 && s.progress < 80)
        || (progressFilter === '≥ 80%' && s.progress >= 80);

      return byQuery && byGroup && byStatus && byProgress;
    });
  }, [query, group, status, progressFilter]);

  return (
    <Container size="xl">
      {/* Header */}
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Управление учениками</Title>
          <Text size="sm" c="dimmed">Мониторинг прогресса, успеваемости и посещаемости студентов</Text>
        </div>
        <Group>
          <Button leftSection={<Plus size={16} />}>Добавить ученика</Button>
        </Group>
      </Group>

      {/* Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md" mb="md">
        <StatCard label="Всего учеников" value="142" delta="+5%" positive />
        <StatCard label="Активные" value="128" delta="+2%" positive />
        <StatCard label="Средний балл" value="4.6" delta="+0.1" positive />
        <StatCard label="Посещаемость" value="92%" delta="-1%" />
      </SimpleGrid>

      {/* Filters */}
      <Paper withBorder radius="md" p="md" mb="md">
        <Group wrap="wrap" gap="md">
          <TextInput
            placeholder="Поиск по имени, ID или email..."
            leftSection={<Search size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            w={{ base: '100%', sm: 360 }}
          />

          <Select
            label={undefined}
            placeholder="Группа: Все"
            data={[...new Set(MOCK_STUDENTS.map((s) => s.group))]}
            clearable
            value={group}
            onChange={setGroup}
          />
          <Select
            placeholder="Статус: Активные"
            data={['Активные', 'В риске', 'Неактивные']}
            clearable
            value={status}
            onChange={setStatus}
          />
          <Select
            placeholder="Прогресс"
            data={['< 50%', '50–80%', '≥ 80%']}
            clearable
            value={progressFilter}
            onChange={setProgressFilter}
          />
        </Group>
      </Paper>

      {/* Table */}
      <Paper withBorder radius="md">
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Ученик</Table.Th>
              <Table.Th>Группа</Table.Th>
              <Table.Th>Прогресс</Table.Th>
              <Table.Th>Посл. урок</Table.Th>
              <Table.Th>Балл</Table.Th>
              <Table.Th>Статус</Table.Th>
              <Table.Th style={{ width: 40 }}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((s) => (
              <Table.Tr key={s.id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar radius="xl" color="blue">{s.name.slice(0,1)}</Avatar>
                    <Box>
                      <Text fw={600} size="sm">{s.name}</Text>
                      <Text size="xs" c="dimmed">{s.email}</Text>
                    </Box>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={600}>{s.group}</Text>
                  {s.subgroup && (
                    <Text size="xs" c="dimmed">{s.subgroup}</Text>
                  )}
                </Table.Td>
                <Table.Td>
                  <Group gap={8} align="center">
                    <Text size="sm" fw={600}>{s.progress}%</Text>
                    <Progress value={s.progress} w={120} radius="xl" size="sm" color={s.progress >= 80 ? 'blue' : s.progress >= 50 ? 'yellow' : 'gray'} />
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{s.lastLesson ? new Date(s.lastLesson).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</Text>
                </Table.Td>
                <Table.Td>
                  {typeof s.score === 'number' ? (
                    <Badge variant="light" color="blue">{s.score.toFixed(1)}</Badge>
                  ) : (
                    <Badge variant="light" color="gray">N/A</Badge>
                  )}
                </Table.Td>
                <Table.Td>
                  <StatusBadge status={s.status} />
                </Table.Td>
                <Table.Td>
                  <Menu shadow="md" width={180} position="bottom-end">
                    <Menu.Target>
                      <ActionIcon variant="subtle" aria-label="Действия">
                        <MoreVertical size={18} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>Открыть профиль</Menu.Item>
                      <Menu.Item>Отправить сообщение</Menu.Item>
                      <Divider />
                      <Menu.Item color="red">Удалить</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Divider />
        <Group justify="space-between" p="sm">
          <Text size="sm" c="dimmed">Показано {filtered.length} из {MOCK_STUDENTS.length} результатов</Text>
          <Pagination total={14} value={1} onChange={() => {}} size="sm" radius="md" />
        </Group>
      </Paper>
    </Container>
  );
}
