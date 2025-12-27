import { create } from 'zustand'
import type { Student } from './types'

interface StudentStore {
  students: Student[]
  selectedStudent: Student | null
  setStudents: (students: Student[]) => void
  addStudent: (student: Student) => void
  updateStudent: (id: string, data: Partial<Student>) => void
  deleteStudent: (id: string) => void
  selectStudent: (student: Student | null) => void
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  selectedStudent: null,
  setStudents: (students) => set({ students }),
  addStudent: (student) => set((state) => ({ students: [...state.students, student] })),
  updateStudent: (id, data) =>
    set((state) => ({
      students: state.students.map((s) => (s.id === id ? { ...s, ...data } : s)),
    })),
  deleteStudent: (id) => set((state) => ({ students: state.students.filter((s) => s.id !== id) })),
  selectStudent: (student) => set({ selectedStudent: student }),
}))
