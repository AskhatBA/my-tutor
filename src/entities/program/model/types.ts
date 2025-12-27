import type { BaseEntity } from '@/shared/types'

export interface Program extends BaseEntity {
  title: string
  description: string
  teacherId: string
  lessons: string[]
  tests: string[]
  duration: number
  level: string
}
