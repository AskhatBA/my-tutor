import type { User } from '@/shared/types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
  role: 'teacher' | 'student'
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}
