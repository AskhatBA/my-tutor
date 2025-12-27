# MyTutor - Project Structure

Этот проект использует **Feature-Sliced Design (FSD)** архитектуру для организации кода.

## 📁 Структура проекта

```
src/
├── app/                         # Уровень приложения
│   ├── App.tsx                  # Корневой компонент
│   ├── main.tsx                 # Точка входа
│   ├── providers/               # Провайдеры приложения
│   │   ├── MantineProvider.tsx
│   │   ├── QueryProvider.tsx
│   │   └── StoreProvider.tsx
│   └── styles/                  # Глобальные стили
│       ├── global.css
│       └── mantine-theme.ts
│
├── entities/                    # Доменные сущности
│   ├── student/
│   │   ├── model/
│   │   │   ├── types.ts         # TypeScript типы
│   │   │   └── store.ts         # Zustand store
│   │   ├── ui/
│   │   │   ├── StudentCard.tsx
│   │   │   └── StudentList.tsx
│   │   └── api/
│   │       └── studentApi.ts
│   ├── lesson/
│   ├── test/
│   ├── program/
│   └── material/
│
├── features/                    # Функциональные фичи
│   ├── auth/
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── store.ts
│   │   ├── ui/
│   │   │   └── LoginForm.tsx
│   │   └── lib/
│   │       └── useAuth.ts
│   ├── progress-tracking/
│   ├── test-creation/
│   ├── lesson-scheduling/
│   ├── ai-assistant/
│   └── video-call/
│
├── pages/                       # Страницы приложения
│   ├── teacher/
│   │   ├── DashboardPage.tsx
│   │   └── StudentsPage.tsx
│   ├── student/
│   │   └── StudentDashboardPage.tsx
│   └── shared/
│       └── NotFoundPage.tsx
│
├── processes/                   # Сложные бизнес-процессы
│   └── onboarding/
│
├── shared/                      # Общие утилиты и компоненты
│   ├── api/
│   │   └── instance.ts          # API клиент
│   ├── config/
│   │   └── env.ts               # Конфигурация окружения
│   ├── lib/
│   │   ├── hooks/
│   │   │   ├── useDebounce.ts
│   │   │   └── useLocalStorage.ts
│   │   └── utils/
│   │       ├── formatDate.ts
│   │       └── cn.ts
│   ├── ui/                      # Переиспользуемые UI компоненты
│   │   ├── LoaderOverlay.tsx
│   │   ├── ErrorAlert.tsx
│   │   ├── EmptyState.tsx
│   │   └── ConfirmationModal.tsx
│   └── types/
│       └── index.ts             # Общие типы
│
└── widgets/                     # Крупные составные блоки
    ├── header/
    │   └── ui/Header.tsx
    └── sidebar/
        ├── ui/
        │   ├── TeacherSidebar.tsx
        │   └── StudentSidebar.tsx
        └── model/navigation.ts
```

## 🏗️ Слои архитектуры

### 1. **app/** - Инициализация приложения
- Точка входа (`main.tsx`)
- Провайдеры (Mantine, TanStack Query, Zustand)
- Глобальные стили и тема
- Корневой компонент с роутингом

### 2. **shared/** - Общая инфраструктура
- API клиент и конфигурация
- Переиспользуемые UI компоненты
- Утилиты и хуки
- Общие типы

### 3. **entities/** - Бизнес-сущности
- Изолированные доменные модели
- Каждая сущность содержит:
  - `model/` - типы и состояние (Zustand store)
  - `ui/` - базовые UI компоненты
  - `api/` - методы взаимодействия с API

### 4. **features/** - Функциональные возможности
- Переиспользуемые бизнес-функции
- Примеры: авторизация, создание тестов, планирование уроков
- Могут использовать entities

### 5. **widgets/** - Составные блоки
- Крупные компоненты (Header, Sidebar, Footer)
- Комбинируют features и entities
- Используются на pages

### 6. **pages/** - Страницы приложения
- Роуты приложения
- Композиция из widgets, features, entities
- Разделены по ролям (teacher/student)

### 7. **processes/** - Бизнес-процессы
- Сложные сценарии, охватывающие несколько страниц
- Пример: онбординг пользователя

## 🔧 Технологии

- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик и dev-сервер
- **Mantine UI v7** - Компонентная библиотека
- **Zustand** - Управление состоянием
- **TanStack Query v5** - Кеширование и синхронизация данных
- **React Router v7** - Роутинг

## 🎯 Правила импорта

### Разрешенные зависимости (сверху вниз):
```
app → processes → pages → widgets → features → entities → shared
```

### Запрещено:
- ❌ shared не может импортировать из других слоев
- ❌ entities не могут импортировать друг друга
- ❌ features не могут импортировать из pages/widgets

### Алиасы путей:
```typescript
import { User } from '@/shared/types'
import { useAuth } from '@/features/auth/lib/useAuth'
import { StudentCard } from '@/entities/student/ui/StudentCard'
```

## 📝 Примеры использования

### Создание новой сущности

1. Создайте структуру в `entities/`:
```
entities/
└── homework/
    ├── model/
    │   ├── types.ts
    │   └── store.ts
    ├── ui/
    │   └── HomeworkCard.tsx
    └── api/
        └── homeworkApi.ts
```

2. Определите типы (`model/types.ts`):
```typescript
import type { BaseEntity } from '@/shared/types'

export interface Homework extends BaseEntity {
  title: string
  description: string
  studentId: string
  dueDate: Date
}
```

3. Создайте store (`model/store.ts`):
```typescript
import { create } from 'zustand'
import type { Homework } from './types'

interface HomeworkStore {
  homeworks: Homework[]
  addHomework: (homework: Homework) => void
}

export const useHomeworkStore = create<HomeworkStore>((set) => ({
  homeworks: [],
  addHomework: (homework) => 
    set((state) => ({ homeworks: [...state.homeworks, homework] })),
}))
```

### Создание новой страницы

```typescript
// pages/teacher/HomeworkPage.tsx
import { Container, Title } from '@mantine/core'
import { HomeworkList } from '@/entities/homework/ui/HomeworkList'

export function HomeworkPage() {
  return (
    <Container size="xl">
      <Title mb="xl">Домашние задания</Title>
      <HomeworkList />
    </Container>
  )
}
```

## 🚀 Команды

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Preview продакшн сборки
npm run preview

# Линтинг
npm run lint
```

## 📚 Дополнительные ресурсы

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Mantine UI Docs](https://mantine.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query/latest)
