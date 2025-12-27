import type { BaseEntity } from '@/shared/types'

export interface Student extends BaseEntity {
  name: string
  email: string
  avatar?: string
  teacherId: string
  level: string
  totalLessons: number
  completedLessons: number
  progress: number
}
