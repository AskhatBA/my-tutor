import type { BaseEntity } from '@/shared/types'

export interface Material extends BaseEntity {
  title: string
  description: string
  type: 'video' | 'document' | 'audio' | 'link'
  url: string
  teacherId: string
  tags: string[]
}
