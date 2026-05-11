import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from './types';
import { USER_STORE } from './constants';

interface UserStore {
  user: User | null
  setUser: (user: User) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        role: 'teacher',
        name: 'Айдос Нурбеков',
        avatar: undefined,
        email: 'test@test.com',
        id: '123',
      },
      setUser: (user) => set({ user }),
    }),
    { name: USER_STORE },
  ),
);
