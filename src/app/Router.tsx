import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from '@/pages/dashboard';
import { StudentsPage } from '@/pages/students';
import { SchedulePage } from '@/pages/schedule';
import { NotFoundPage } from '@/pages/not-found';
import { Routes as RouteNames } from '@/shared/constants';
import { ChatPage } from '@/pages/chat';

export function Router() {
  return (
    <Routes>
      <Route
        path={RouteNames.Root}
        element={
          <Navigate
            to={RouteNames.Dashboard}
            replace
          />
        }
      />

      <Route path={RouteNames.Dashboard} element={<DashboardPage/>}/>
      <Route path={RouteNames.Students} element={<StudentsPage/>}/>
      <Route path={RouteNames.Lessons} element={<div>Уроки (в разработке)</div>}/>
      <Route path={RouteNames.Tests} element={<div>Тесты (в разработке)</div>}/>
      <Route path={RouteNames.Programs} element={<div>Программы (в разработке)</div>}/>
      <Route path={RouteNames.Materials} element={<div>Материалы (в разработке)</div>}/>
      <Route path={RouteNames.Schedule} element={<SchedulePage/>}/>
      <Route path={RouteNames.Chat} element={<ChatPage/>}/>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
