import { ActionIcon, Button, Group, rem, SegmentedControl, Title } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useScheduleCalendarStore } from '../model/store';
import { ViewMode } from '../model/types';
import { formatDate, addDays } from '@/shared/lib';

export const HeaderControls = () => {
  const { mode, setMode, currentDate, setCurrentDate } = useScheduleCalendarStore();

  const onPrev = () => setCurrentDate(addDays(currentDate, mode === 'month' ? -30 : mode === 'week' ? -7 : -1));

  const onNext = () => setCurrentDate(addDays(currentDate, mode === 'month' ? +30 : mode === 'week' ? +7 : +1));

  const onToday = () => setCurrentDate(new Date());

  return (
    <Group justify="space-between" align="center" mb="md">
      <Group>
        <ActionIcon size="lg" variant="default" onClick={onPrev} aria-label="Предыдущая неделя">
          <IconChevronLeft size={18} />
        </ActionIcon>
        <ActionIcon size="lg" variant="default" onClick={onNext} aria-label="Следующая неделя">
          <IconChevronRight size={18} />
        </ActionIcon>
        <Button variant="light" onClick={onToday}>Сегодня</Button>
        <Title order={3}>{formatDate(currentDate)}</Title>
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
      </Group>
    </Group>
  );
};
