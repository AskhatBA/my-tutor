import { useMemo, useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Pill,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconDots,
  IconDownload,
  IconEye,
  IconFolder,
  IconLayoutGrid,
  IconLayoutList,
  IconShare2,
  IconTrash,
  IconVideo,
  IconFileText,
} from '@tabler/icons-react';

type Folder = {
  id: string;
  name: string;
  filesCount: number;
};

type FileItem = {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'video' | 'doc' | 'other';
  date: string;
  preview?: string; // url
  tags?: string[];
};

const mockFolders: Folder[] = [
  { id: 'f1', name: 'Алгебра', filesCount: 14 },
  { id: 'f2', name: 'Геометрия', filesCount: 8 },
];

const mockFiles: FileItem[] = [
  { id: '1', name: 'Итоговая контрольная работа.pdf', size: '2.4 MB', type: 'pdf', date: 'Сегодня', tags: ['алгебра', 'экзамен'] },
  { id: '2', name: 'Методические указания.docx', size: '856 KB', type: 'doc', date: 'Вчера' },
  { id: '3', name: 'Разбор задач.mp4', size: '128 MB', type: 'video', date: '15 Окт' },
  { id: '4', name: 'Оценки за 1 четверть.png', size: '45 KB', type: 'other', date: '10 Окт' },
];

function FileIcon({ type }: { type: FileItem['type'] }) {
  switch (type) {
    case 'pdf':
      return <IconFileText size={18} color="#e03131" />;
    case 'video':
      return <IconVideo size={18} color="#5c7cfa" />;
    case 'doc':
      return <IconFileText size={18} color="#228be6" />;
    default:
      return <IconFileText size={18} />;
  }
}

export function MaterialsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState<'all' | 'docs' | 'video' | 'images'>('all');
  const [selected, setSelected] = useState<FileItem | null>(mockFiles[0]);

  const breadcrumbs = (
    <Breadcrumbs>
      <Anchor component="button" onClick={() => {}}>Мои файлы</Anchor>
      <Anchor component="button" onClick={() => {}}>Математика</Anchor>
      <Text c="dimmed">9 Класс</Text>
    </Breadcrumbs>
  );

  const filteredFiles = useMemo(() => {
    switch (activeFilter) {
      case 'docs':
        return mockFiles.filter((f) => f.type === 'pdf' || f.type === 'doc');
      case 'video':
        return mockFiles.filter((f) => f.type === 'video');
      case 'images':
        return mockFiles.filter((f) => f.name.match(/\.(png|jpg|jpeg)$/i));
      default:
        return mockFiles;
    }
  }, [activeFilter]);

  return (
    <Grid gutter="lg">
      <Grid.Col span={{ base: 12, lg: 8 }}>
        <Stack gap="md">
          {breadcrumbs}
          <Group justify="space-between" align="center">
            <Title order={2}>9 Класс: Материалы</Title>
            <Group gap="xs">
              <Select
                data={[
                  { value: 'date', label: 'Дата добавления' },
                  { value: 'name', label: 'Имя' },
                  { value: 'size', label: 'Размер' },
                ]}
                placeholder="Сортировка"
                value={'date'}
                w={220}
              />
              <SegmentedControl
                value={view}
                onChange={(v) => setView(v as any)}
                data={[
                  { value: 'grid', label: <IconLayoutGrid size={16} /> },
                  { value: 'list', label: <IconLayoutList size={16} /> },
                ]}
              />
            </Group>
          </Group>

          <Group>
            <Pill.Group>
              <Pill checked={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>Все</Pill>
              <Pill checked={activeFilter === 'docs'} onClick={() => setActiveFilter('docs')}>Документы</Pill>
              <Pill checked={activeFilter === 'video'} onClick={() => setActiveFilter('video')}>Видео</Pill>
              <Pill checked={activeFilter === 'images'} onClick={() => setActiveFilter('images')}>Изображения</Pill>
            </Pill.Group>
          </Group>

          <Text fw={600} c="dimmed" size="sm" mt="md">Папки</Text>
          <Grid gutter="md">
            {mockFolders.map((folder) => (
              <Grid.Col key={folder.id} span={{ base: 6, sm: 4, md: 3 }}>
                <Card withBorder radius="md" p="md">
                  <Stack gap={8}>
                    <IconFolder size={30} />
                    <Text fw={600} lineClamp={1}>{folder.name}</Text>
                    <Text size="xs" c="dimmed">{folder.filesCount} файлов</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>

          <Text fw={600} c="dimmed" size="sm" mt="md">Файлы</Text>
          {view === 'grid' ? (
            <Grid gutter="md">
              {filteredFiles.map((file) => (
                <Grid.Col key={file.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Card
                    withBorder
                    radius="md"
                    p="md"
                    onClick={() => setSelected(file)}
                    style={{ cursor: 'pointer' }}
                    data-selected={selected?.id === file.id}
                  >
                    <Stack gap={10}>
                      <Group justify="space-between">
                        <Badge variant="light" leftSection={<FileIcon type={file.type} />}>{file.type.toUpperCase()}</Badge>
                        <ActionIcon variant="subtle"><IconDots size={16}/></ActionIcon>
                      </Group>
                      <Text fw={600} lineClamp={2}>{file.name}</Text>
                      <Text size="xs" c="dimmed">{file.size} • {file.date}</Text>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Stack>
              {filteredFiles.map((file) => (
                <Card key={file.id} withBorder radius="md" p="sm" onClick={() => setSelected(file)} style={{ cursor: 'pointer' }}>
                  <Group justify="space-between">
                    <Group>
                      <FileIcon type={file.type} />
                      <Text fw={600}>{file.name}</Text>
                    </Group>
                    <Group gap="xs">
                      <Badge variant="light">{file.size}</Badge>
                      <Text size="sm" c="dimmed">{file.date}</Text>
                    </Group>
                  </Group>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, lg: 4 }}>
        <Paper withBorder radius="md" p="md">
          {selected ? (
            <Stack gap="md">
              <Image
                src={selected.preview || 'https://images.unsplash.com/photo-1526378787940-576a539ba69d?q=80&w=800&auto=format&fit=crop'}
                radius="sm"
              />
              <Group gap={6}>
                <Badge variant="light" leftSection={<FileIcon type={selected.type} />}>PDF DOCUMENT</Badge>
              </Group>
              <Title order={4} lh={1.3}>{selected.name}</Title>
              <Group gap={6}>
                {(selected.tags || []).map((t) => (
                  <Badge key={t} variant="light">#{t}</Badge>
                ))}
              </Group>

              <Divider/>

              <Stack gap={6}>
                <Group justify="space-between"><Text c="dimmed" size="sm">Размер</Text><Text size="sm">{selected.size}</Text></Group>
                <Group justify="space-between"><Text c="dimmed" size="sm">Создан</Text><Text size="sm">20 Окт, 2023</Text></Group>
                <Group justify="space-between"><Text c="dimmed" size="sm">Изменен</Text><Text size="sm">Сегодня, 10:45</Text></Group>
                <Group justify="space-between"><Text c="dimmed" size="sm">Владелец</Text><Text size="sm">Вы</Text></Group>
                <Group justify="space-between"><Text c="dimmed" size="sm">Доступ</Text><Badge variant="light" color="green">Публичный</Badge></Group>
              </Stack>

              <Divider/>

              <Group grow>
                <Button leftSection={<IconEye size={16}/>}>Открыть</Button>
              </Group>
              <Group>
                <Button variant="default" leftSection={<IconDownload size={16}/>}>Скачать</Button>
                <Button variant="default" leftSection={<IconShare2 size={16}/>}>Поделиться</Button>
              </Group>
              <Button color="red" variant="subtle" leftSection={<IconTrash size={16}/>}>Удалить файл</Button>
            </Stack>
          ) : (
            <Stack align="center" gap="sm">
              <Text c="dimmed">Выберите файл, чтобы увидеть свойства</Text>
            </Stack>
          )}
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

export default MaterialsPage;
