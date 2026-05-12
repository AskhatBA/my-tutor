import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useTestStore, type Test, type TestDraft } from '@/entities/test';
import { useStudentStore } from '@/entities/student/model/store';
import { Routes } from '@/shared/constants';
import { TestRow } from './TestRow';
import { SystemTestsSidebar } from './SystemTestsSidebar';
import { TestFormModal } from './TestFormModal';
import { AssignToStudentsModal } from './AssignToStudentsModal';
import { TestResultsModal } from './TestResultsModal';

const mockStudents = [
  {
    id: 'stu-1',
    name: 'Алия Кенжебаева',
    email: 'aliya@example.com',
    teacherId: '123',
    level: 'B1',
    totalLessons: 24,
    completedLessons: 18,
    progress: 75,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'stu-2',
    name: 'Данияр Сейтжанов',
    email: 'daniyar@example.com',
    teacherId: '123',
    level: 'A2',
    totalLessons: 12,
    completedLessons: 4,
    progress: 33,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'stu-3',
    name: 'Мадина Жумабекова',
    email: 'madina@example.com',
    teacherId: '123',
    level: 'B2',
    totalLessons: 30,
    completedLessons: 27,
    progress: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function TestsPage() {
  const myTests = useTestStore((s) => s.myTests);

  const systemTests = useTestStore((s) => s.systemTests);

  const updateTest = useTestStore((s) => s.updateTest);

  const deleteTest = useTestStore((s) => s.deleteTest);

  const toggleFavorite = useTestStore((s) => s.toggleFavorite);

  const copySystemTestToMine = useTestStore((s) => s.copySystemTestToMine);

  const assignToStudents = useTestStore((s) => s.assignToStudents);

  const unassignStudent = useTestStore((s) => s.unassignStudent);

  const students = useStudentStore((s) => s.students);

  const setStudents = useStudentStore((s) => s.setStudents);

  const studentsById = useMemo(
    () => new Map(students.map((s) => [s.id, s])),
    [students],
  );

  useEffect(() => {
    if (students.length === 0) setStudents(mockStudents);
  }, [students.length, setStudents]);

  const [formOpened, setFormOpened] = useState(false);

  const [editingTest, setEditingTest] = useState<Test | null>(null);

  const [deletingTest, setDeletingTest] = useState<Test | null>(null);

  const [assigningTest, setAssigningTest] = useState<Test | null>(null);

  const [resultsTestId, setResultsTestId] = useState<string | null>(null);

  const resultsTest = useMemo(
    () => myTests.find((t) => t.id === resultsTestId) ?? null,
    [myTests, resultsTestId],
  );

  const myTestKeys = useMemo(
    () => new Set(myTests.map((t) => t.tag + '|' + t.title)),
    [myTests],
  );

  const sortedMyTests = useMemo(
    () => [...myTests].sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite)),
    [myTests],
  );

  const openEdit = (test: Test) => {
    setEditingTest(test);
    setFormOpened(true);
  };

  const handleSubmit = (draft: TestDraft) => {
    if (editingTest) updateTest(editingTest.id, draft);
  };

  const handleDeleteConfirm = () => {
    if (!deletingTest) return;

    deleteTest(deletingTest.id);
    setDeletingTest(null);
  };

  return (
    <Grid gutter="lg">
      <Grid.Col span={{ base: 12, lg: 8 }}>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={2}>Тесты</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              component={Link}
              to={Routes.TestCreate}
            >
              Создать тест
            </Button>
          </Group>

          {sortedMyTests.length === 0 ? (
            <Text c="dimmed">
              У вас пока нет тестов. Создайте первый или добавьте из системных.
            </Text>
          ) : (
            <Stack gap="sm">
              {sortedMyTests.map((test) => {
                const assignedStudents = test.assignedStudentIds
                  .map((id) => studentsById.get(id))
                  .filter((s): s is NonNullable<typeof s> => s !== undefined);

                return (
                  <TestRow
                    key={test.id}
                    test={test}
                    assignedStudents={assignedStudents}
                    onToggleFavorite={() => toggleFavorite(test.id)}
                    onEdit={() => openEdit(test)}
                    onDelete={() => setDeletingTest(test)}
                    onAssign={() => setAssigningTest(test)}
                    onUnassign={(studentId) => unassignStudent(test.id, studentId)}
                    onShowResults={() => setResultsTestId(test.id)}
                  />
                );
              })}
            </Stack>
          )}
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, lg: 4 }}>
        <SystemTestsSidebar
          tests={systemTests}
          myTagSet={myTestKeys}
          onAdd={copySystemTestToMine}
        />
      </Grid.Col>

      <TestFormModal
        opened={formOpened}
        initialTest={editingTest}
        onClose={() => setFormOpened(false)}
        onSubmit={handleSubmit}
      />

      <AssignToStudentsModal
        opened={assigningTest !== null}
        testTitle={assigningTest?.title ?? ''}
        alreadyAssignedIds={assigningTest?.assignedStudentIds ?? []}
        onClose={() => setAssigningTest(null)}
        onSubmit={(ids) => assigningTest && assignToStudents(assigningTest.id, ids)}
      />

      <TestResultsModal
        opened={resultsTest !== null}
        test={resultsTest}
        studentsById={studentsById}
        onClose={() => setResultsTestId(null)}
      />

      <Modal
        opened={deletingTest !== null}
        onClose={() => setDeletingTest(null)}
        title="Удалить тест?"
        size="sm"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            Удалить тест «{deletingTest?.title}»? Это действие нельзя отменить.
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setDeletingTest(null)}>Отмена</Button>
            <Button color="red" onClick={handleDeleteConfirm}>Удалить</Button>
          </Group>
        </Stack>
      </Modal>
    </Grid>
  );
}
