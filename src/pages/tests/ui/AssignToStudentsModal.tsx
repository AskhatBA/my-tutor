import { useState } from 'react';
import {
  Button,
  Checkbox,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { useStudentStore } from '@/entities/student/model/store';

interface AssignToStudentsModalProps {
  opened: boolean;
  testTitle: string;
  alreadyAssignedIds: string[];
  onClose: () => void;
  onSubmit: (studentIds: string[]) => void;
}

export function AssignToStudentsModal({
  opened,
  testTitle,
  alreadyAssignedIds,
  onClose,
  onSubmit,
}: AssignToStudentsModalProps) {
  const students = useStudentStore((s) => s.students);

  const [selected, setSelected] = useState<string[]>([]);

  const [wasOpened, setWasOpened] = useState(opened);

  if (wasOpened !== opened) {
    setWasOpened(opened);

    if (opened) setSelected([]);
  }

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const handleSubmit = () => {
    if (selected.length === 0) return;

    onSubmit(selected);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Отправить тест: ${testTitle}`}
      size="md"
      centered
    >
      <Stack gap="sm">
        {students.length === 0 ? (
          <Text c="dimmed" size="sm">
            У вас пока нет учеников. Добавьте их в разделе «Студенты».
          </Text>
        ) : (
          <ScrollArea.Autosize mah={320}>
            <Stack gap="xs">
              {students.map((student) => {
                const already = alreadyAssignedIds.includes(student.id);

                return (
                  <Checkbox
                    key={student.id}
                    checked={selected.includes(student.id) || already}
                    onChange={() => !already && toggle(student.id)}
                    disabled={already}
                    label={
                      already
                        ? `${student.name} (уже отправлен)`
                        : student.name
                    }
                  />
                );
              })}
            </Stack>
          </ScrollArea.Autosize>
        )}
        <Group justify="flex-end" mt="sm">
          <Button variant="default" onClick={onClose}>Отмена</Button>
          <Button onClick={handleSubmit} disabled={selected.length === 0}>
            Отправить ({selected.length})
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
