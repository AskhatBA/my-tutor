import type { BaseEntity } from '@/shared/types'

export interface Test extends BaseEntity {
  title: string
  description: string
  questions: Question[]
  teacherId: string
  timeLimit?: number
}

export interface Question {
  id: string
  text: string
  type: 'multiple-choice' | 'text' | 'true-false'
  options?: string[]
  correctAnswer: string | string[]
}
