export type Role = 'teacher' | 'student'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  avatar?: string
}

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
