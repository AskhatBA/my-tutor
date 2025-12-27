import type { BaseEntity } from '@/shared/types'

export interface Lesson extends BaseEntity {
  title: string
  description: string
  studentId: string
  teacherId: string
  scheduledAt: Date
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled'
}
