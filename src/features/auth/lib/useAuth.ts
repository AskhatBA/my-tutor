import { useAuthStore } from '../model/store';

export function useAuth() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    logout,
  };
}
