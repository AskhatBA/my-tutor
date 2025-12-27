import { Stack } from '@mantine/core'
import type { Student } from '../model/types'
import { StudentCard } from './StudentCard'

interface Props {
  students: Student[]
  onStudentClick?: (student: Student) => void
}

export function StudentList({ students, onStudentClick }: Props) {
  return (
    <Stack gap="md">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onClick={() => onStudentClick?.(student)}
        />
      ))}
    </Stack>
  )
}
