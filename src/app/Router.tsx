import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from '@/pages/dashboard';
import { StudentsPage } from '@/pages/students';
import { SchedulePage } from '@/pages/schedule';
import { NotFoundPage } from '@/pages/not-found';
import { Routes as RouteNames } from '@/shared/constants';
import { ChatPage } from '@/pages/chat';
import { MaterialsPage } from '@/pages/materials';
import { TestsPage } from '@/pages/tests';

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
      <Route path={RouteNames.StudentDetails} element={<StudentsPage/>}/>
      <Route path={RouteNames.Lessons} element={<div>Уроки (в разработке)</div>}/>
      <Route path={RouteNames.Tests} element={<TestsPage/>}/>
      <Route path={RouteNames.Programs} element={<div>Программы (в разработке)</div>}/>
      <Route path={RouteNames.Materials} element={<MaterialsPage/>}/>
      <Route path={RouteNames.Schedule} element={<SchedulePage/>}/>
      <Route path={RouteNames.Chat} element={<ChatPage/>}/>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
