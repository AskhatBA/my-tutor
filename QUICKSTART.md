# MyTutor - Quick Start Guide

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск dev-сервера
```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:5173`

### 3. Вход в систему

При первом запуске вы увидите форму входа. Используйте любые данные для демо-входа:
- Email: `test@example.com`
- Password: `password`

После входа вы попадете на панель преподавателя или студента (в зависимости от выбранной роли при настройке).

## 📂 Основная структура

```
MyTutor/
├── src/
│   ├── app/          # Приложение и провайдеры
│   ├── entities/     # Доменные сущности (student, lesson, test, etc.)
│   ├── features/     # Функции (auth, progress-tracking, etc.)
│   ├── pages/        # Страницы приложения
│   ├── widgets/      # Крупные блоки (header, sidebar)
│   └── shared/       # Общие утилиты и компоненты
├── STRUCTURE.md      # Подробная документация архитектуры
└── README.md         # Основная документация
```

## 🛠️ Основные команды

```bash
# Разработка с hot reload
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшн сборки
npm run preview

# Проверка кода (ESLint)
npm run lint
```

## 🎨 Используемые технологии

- **React 19** + **TypeScript** - Основа приложения
- **Vite** - Быстрая сборка и dev-сервер
- **Mantine UI v7** - Современные UI компоненты
- **Zustand** - Легкое управление состоянием
- **TanStack Query v5** - Работа с асинхронными данными
- **React Router v7** - Роутинг

## 📖 Роли пользователей

### Преподаватель (Teacher)
- Панель управления
- Список студентов
- Управление уроками
- Создание тестов
- Программы обучения
- Материалы
- Расписание

### Студент (Student)
- Личная панель
- Отслеживание прогресса
- Прохождение тестов
- Просмотр уроков
- Словарь

## 🔧 Настройка окружения

Скопируйте `.env.example` в `.env` и настройте переменные:

```bash
cp .env.example .env
```

Отредактируйте `.env`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
```

## 📚 Дополнительная документация

- **STRUCTURE.md** - Детальное описание архитектуры Feature-Sliced Design
- **README.md** - Общая информация о проекте

## 🐛 Возможные проблемы

### Ошибка при сборке
```bash
# Очистите кеш и переустановите зависимости
rm -rf node_modules package-lock.json
npm install
```

### Проблемы с путями импорта
Убедитесь, что используете алиас `@/` для импортов:
```typescript
// ✅ Правильно
import { User } from '@/shared/types'

// ❌ Неправильно
import { User } from '../../../shared/types'
```

## 🎯 Следующие шаги

1. Изучите структуру проекта в `STRUCTURE.md`
2. Посмотрите примеры компонентов в `src/entities/student/`
3. Изучите настройку провайдеров в `src/app/providers/`
4. Начните добавлять свои функции в соответствующие слои

## 💡 Полезные ссылки

- [Mantine UI Components](https://mantine.dev/core/button/)
- [Zustand Examples](https://github.com/pmndrs/zustand)
- [React Router Guide](https://reactrouter.com/)
- [Feature-Sliced Design](https://feature-sliced.design/)
