export interface NavItem {
  label: string
  path: string
  icon?: string
}

export const teacherNavigation: NavItem[] = [
  { label: 'Панель', path: '/teacher/dashboard' },
  { label: 'Студенты', path: '/teacher/students' },
  { label: 'Уроки', path: '/teacher/lessons' },
  { label: 'Тесты', path: '/teacher/tests' },
  { label: 'Программы', path: '/teacher/programs' },
  { label: 'Материалы', path: '/teacher/materials' },
  { label: 'Расписание', path: '/teacher/schedule' },
]

export const studentNavigation: NavItem[] = [
  { label: 'Моя панель', path: '/student/dashboard' },
  { label: 'Мой прогресс', path: '/student/progress' },
  { label: 'Тесты', path: '/student/tests' },
  { label: 'Уроки', path: '/student/lessons' },
  { label: 'Словарь', path: '/student/dictionary' },
]
