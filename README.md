# MyTutor

Современное React-приложение для онлайн-обучения с чистой архитектурой Feature-Sliced Design.

## 🎯 О проекте

MyTutor - это платформа для онлайн-обучения с раздельными интерфейсами для преподавателей и студентов. Проект построен с использованием современного стека технологий и следует принципам Feature-Sliced Design для масштабируемости и поддерживаемости.

## ✨ Особенности

- 🎨 **Современный UI** с Mantine UI v7
- 🏗️ **Feature-Sliced Design** архитектура
- 🔐 **Аутентификация** с разделением ролей (преподаватель/студент)
- 📊 **Отслеживание прогресса** студентов
- 📝 **Управление тестами** и материалами
- 📅 **Планирование уроков**
- ⚡ **Быстрая разработка** с Vite и Hot Module Replacement
- 🎯 **TypeScript** для полной типобезопасности

## 🛠️ Tech Stack

- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Быстрый сборщик и dev-сервер
- **Mantine UI v7** - Компонентная библиотека
- **Zustand** - Управление состоянием
- **TanStack Query v5** - Работа с данными и кеширование
- **React Router v7** - Роутинг
- **ESLint** - Линтинг кода

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 📂 Структура проекта

Проект использует **Feature-Sliced Design** - архитектурную методологию для фронтенд-проектов:

```
src/
├── app/                    # Инициализация приложения
│   ├── providers/          # React провайдеры
│   └── styles/             # Глобальные стили
├── entities/               # Бизнес-сущности
│   ├── student/
│   ├── lesson/
│   ├── test/
│   └── ...
├── features/               # Функциональность
│   ├── auth/
│   ├── progress-tracking/
│   └── ...
├── pages/                  # Страницы приложения
│   ├── teacher/
│   └── student/
├── widgets/                # Составные блоки
│   ├── header/
│   └── sidebar/
└── shared/                 # Переиспользуемый код
    ├── api/
    ├── ui/
    ├── lib/
    └── types/
```

📖 **Детальная документация архитектуры:** [STRUCTURE.md](./STRUCTURE.md)

## 🚀 Быстрый старт

### Установка

```bash
npm install
```

### Разработка

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`

### Сборка

```bash
npm run build
```

### Предпросмотр продакшн сборки

```bash
npm run preview
```

### Линтинг

```bash
npm run lint
```

## 📖 Документация

- **[QUICKSTART.md](./QUICKSTART.md)** - Руководство для быстрого старта
- **[STRUCTURE.md](./STRUCTURE.md)** - Подробное описание архитектуры

## 🎓 Функциональность

### Для преподавателей
- 📊 Панель управления с аналитикой
- 👥 Управление списком студентов
- 📅 Планирование и управление уроками
- 📝 Создание и управление тестами
- 📚 Библиотека учебных материалов
- 🎯 Программы обучения
- ⏰ Расписание занятий

### Для студентов
- 📈 Личный кабинет с прогрессом
- ✅ Прохождение тестов
- 📖 Доступ к учебным материалам
- 📅 Просмотр расписания уроков
- 📝 Персональный словарь

## 🏗️ Архитектурные принципы

### Feature-Sliced Design

Проект следует методологии FSD с четким разделением на слои:

1. **app** - инициализация и провайдеры
2. **processes** - сквозные бизнес-процессы
3. **pages** - страницы приложения
4. **widgets** - крупные композитные блоки
5. **features** - части функциональности
6. **entities** - бизнес-сущности
7. **shared** - переиспользуемый код

### Правила импорта

```typescript
// ✅ Правильно - используйте алиасы
import { User } from '@/shared/types'
import { useAuth } from '@/features/auth/lib/useAuth'
import { StudentCard } from '@/entities/student/ui/StudentCard'

// ❌ Неправильно - относительные пути
import { User } from '../../../shared/types'
```

## 🤝 Разработка

### Добавление новой сущности

1. Создайте структуру в `src/entities/your-entity/`
2. Определите типы в `model/types.ts`
3. Создайте store в `model/store.ts`
4. Добавьте UI компоненты в `ui/`
5. Реализуйте API методы в `api/`

### Добавление новой страницы

1. Создайте компонент в `src/pages/teacher/` или `src/pages/student/`
2. Добавьте роут в `src/app/App.tsx`
3. Обновите навигацию в `src/widgets/sidebar/model/navigation.ts`

### Кастомизация темы

Отредактируйте `src/app/styles/mantine-theme.ts` для изменения цветов, шрифтов и других параметров темы.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
