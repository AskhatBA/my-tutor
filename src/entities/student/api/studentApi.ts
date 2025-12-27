import { apiClient } from '@/shared/api/instance'
import type { Student } from '../model/types'

export const studentApi = {
  getAll: () => apiClient.get<Student[]>('/students'),
  getById: (id: string) => apiClient.get<Student>(`/students/${id}`),
  create: (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiClient.post<Student>('/students', data),
  update: (id: string, data: Partial<Student>) => apiClient.put<Student>(`/students/${id}`, data),
  delete: (id: string) => apiClient.delete<void>(`/students/${id}`),
}
