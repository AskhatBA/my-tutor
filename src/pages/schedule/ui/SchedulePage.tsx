import { useMemo, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Container,
  Group,
  Menu,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  Title,
  Tooltip,
  rem,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconDots } from '@tabler/icons-react';

type ViewMode = 'day' | 'week' | 'month'

type LessonType = 'individual' | 'group' | 'webinar'

type EventItem = {
  id: string
  title: string
  teacher?: string
  date: Date
  start: string // HH:mm
  end: string // HH:mm
  type: LessonType
  color: string
}

function startOfWeek(date: Date) {
  const d = new Date(date);

  const day = (d.getDay() + 6) % 7; // make Monday=0

  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);

  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);

  d.setDate(d.getDate() + days);

  return d;
}

function formatHM(str: string) {
  return str;
}

function timeToRow(time: string) {
  const [h, m] = time.split(':').map(Number);

  return h * 2 + (m >= 30 ? 2 : 1); // 30min step, start from 0:00
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const TYPE_META: Record<LessonType, { label: string; color: string }> = {
  individual: { label: 'Индивидуально', color: 'blue' },
  group: { label: 'Группа', color: 'teal' },
  webinar: { label: 'Вебинар', color: 'grape' },
};

const mockEvents: EventItem[] = [
  {
    id: '1',
    title: 'Математика (Группа 10А)',
    date: addDays(startOfWeek(new Date()), 0),
    start: '10:00',
    end: '11:30',
    type: 'group',
    color: 'teal',
  },
  {
    id: '2',
    title: 'Алгебра',
    teacher: 'Иван С.',
    date: addDays(startOfWeek(new Date()), 2),
    start: '09:15',
    end: '10:15',
    type: 'individual',
    color: 'blue',
  },
  {
    id: '3',
    title: 'Вебинар: Подготовка к ЕГЭ',
    date: addDays(startOfWeek(new Date()), 2),
    start: '11:00',
    end: '12:00',
    type: 'webinar',
    color: 'grape',
  },
  {
    id: '4',
    title: 'Геометрия',
    teacher: 'Мария К.',
    date: addDays(startOfWeek(new Date()), 2),
    start: '12:30',
    end: '14:00',
    type: 'individual',
    color: 'orange',
  },
  {
    id: '5',
    title: 'Консультация',
    date: addDays(startOfWeek(new Date()), 3),
    start: '14:00',
    end: '15:00',
    type: 'group',
    color: 'violet',
  },
];

export function SchedulePage() {
  const [current, setCurrent] = useState(new Date());

  const [mode, setMode] = useState<ViewMode>('week');

  const weekStart = useMemo(() => startOfWeek(current), [current]);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

  const monthFormatter = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' });

  const dayFormatter = new Intl.DateTimeFormat('ru-RU', { weekday: 'short', day: 'numeric' });

  const eventsForDay = (d: Date) =>
    mockEvents.filter((e) => e.date.toDateString() === d.toDateString());

  const onPrev = () => setCurrent((d) => addDays(d, mode === 'month' ? -30 : mode === 'week' ? -7 : -1));

  const onNext = () => setCurrent((d) => addDays(d, mode === 'month' ? +30 : mode === 'week' ? +7 : +1));

  const onToday = () => setCurrent(new Date());

  return (
    <Box>
      <Group justify="space-between" align="center" mb="md">
        <Group>
          <ActionIcon size="lg" variant="default" onClick={onPrev} aria-label="Предыдущая неделя">
            <IconChevronLeft size={18} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" onClick={onNext} aria-label="Следующая неделя">
            <IconChevronRight size={18} />
          </ActionIcon>
          <Button variant="light" onClick={onToday}>Сегодня</Button>
          <Title order={3}>{monthFormatter.format(current)}</Title>
        </Group>

        <Group>
          <SegmentedControl
            value={mode}
            onChange={(v) => setMode(v as ViewMode)}
            data={[
              { value: 'week', label: 'Неделя' },
              { value: 'month', label: 'Месяц' },
            ]}
          />
          <Button leftSection={<span style={{ display: 'inline-block', width: rem(8), height: rem(8), borderRadius: 9999, background: 'var(--mantine-color-blue-6)' }} />}>Добавить занятие</Button>
          <Menu withinPortal>
            <Menu.Target>
              <ActionIcon variant="default" aria-label="Дополнительно">
                <IconDots size={18} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Импорт</Menu.Item>
              <Menu.Item>Экспорт</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red">Очистить</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>

      {/* Week grid */}
      {mode === 'week' && (
        <Paper withBorder radius="md" p={0}>
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '80px repeat(7, 1fr)',
              gridTemplateRows: `40px repeat(${HOURS.length * 2}, 28px)`,
              position: 'relative',
            }}
          >
            {/* Header row */}
            <Box style={{ borderRight: '1px solid var(--mantine-color-default-border)', borderBottom: '1px solid var(--mantine-color-default-border)' }} />
            {days.map((d) => (
              <Box
                key={d.toISOString()}
                style={{
                  borderBottom: '1px solid var(--mantine-color-default-border)',
                  textAlign: 'center',
                  padding: '8px 0',
                  background: d.toDateString() === new Date().toDateString() ? 'var(--mantine-color-blue-light)' : undefined,
                }}
              >
                <Text fw={600}>{dayFormatter.format(d)}</Text>
              </Box>
            ))}

            {/* Time column */}
            {HOURS.map((h) => (
              <Box key={h} style={{ gridColumn: '1 / 2', gridRow: `${h * 2 + 2} / span 2`, borderTop: '1px solid var(--mantine-color-default-border)', paddingRight: 8, textAlign: 'right' }}>
                <Text size="sm" c="dimmed">{String(h).padStart(2, '0')}:00</Text>
              </Box>
            ))}

            {/* Day columns with lines */}
            {days.map((d, i) => (
              <Box key={`col-${i}`} style={{ gridColumn: `${i + 2} / ${i + 3}`, gridRow: '2 / -1', borderLeft: '1px solid var(--mantine-color-default-border)', position: 'relative' }}>
                {Array.from({ length: HOURS.length }, (_, r) => (
                  <Box key={`row-${r}`} style={{ borderTop: '1px solid var(--mantine-color-default-border)', height: 56, opacity: 0.4 }} />
                ))}

                {/* Events */}
                {eventsForDay(d).map((ev) => {
                  const rowStart = timeToRow(ev.start) + 2;

                  const rowEnd = timeToRow(ev.end) + 2;

                  return (
                    <Tooltip key={ev.id} label={`${formatHM(ev.start)} — ${formatHM(ev.end)}`} withinPortal>
                      <Paper
                        shadow="sm"
                        radius="md"
                        style={{
                          position: 'absolute',
                          left: 8,
                          right: 8,
                          top: (rowStart - 2) * 28,
                          height: (rowEnd - rowStart) * 28 - 6,
                          borderLeft: `${rem(3)} solid var(--mantine-color-${ev.color}-6)`,
                          background: 'var(--mantine-color-body)',
                          padding: '8px 10px',
                        }}
                        withBorder
                      >
                        <Group justify="space-between" gap="xs">
                          <div>
                            <Text size="xs" c="dimmed" fw={600} mb={2}>
                              {ev.start} - {ev.end}
                            </Text>
                            <Text size="sm" fw={600}>{ev.title}</Text>
                            {ev.teacher && (
                              <Text size="xs" c="dimmed">{ev.teacher}</Text>
                            )}
                          </div>
                          <Badge color={TYPE_META[ev.type].color} variant="light">
                            {TYPE_META[ev.type].label}
                          </Badge>
                        </Group>
                      </Paper>
                    </Tooltip>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {mode !== 'week' && (
        <Stack align="center" mt="xl">
          <Text c="dimmed">Режим "{mode}" в разработке. Используйте "Неделя" для просмотра сетки.</Text>
        </Stack>
      )}

      <Group gap="md" mt="md" justify="end" c="dimmed">
        <Group gap="xs">
          <Box style={{ width: 8, height: 8, borderRadius: 9999, background: 'var(--mantine-color-blue-6)' }} />
          <Text size="xs">Индивидуально</Text>
        </Group>
        <Group gap="xs">
          <Box style={{ width: 8, height: 8, borderRadius: 9999, background: 'var(--mantine-color-teal-6)' }} />
          <Text size="xs">Группа</Text>
        </Group>
        <Group gap="xs">
          <Box style={{ width: 8, height: 8, borderRadius: 9999, background: 'var(--mantine-color-grape-6)' }} />
          <Text size="xs">Вебинар</Text>
        </Group>
      </Group>
    </Box>
  );
}

export default SchedulePage;
