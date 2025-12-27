import { NavLink } from 'react-router-dom';
import { Routes as RouteNames } from '@/shared/constants';
import {
  Users,
  BookOpen,
  FlaskConical,
  Calendar,
  MessageSquare,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { Box } from '@mantine/core';
import type { ComponentProps, ReactNode } from 'react';
import { UserBaseInfo } from '@/entities/user';

type Item = {
  label: string;
  to: string;
  icon: ReactNode;
};

const items: Item[] = [
  { label: 'Ученики', to: RouteNames.Students, icon: <Users size={18} /> },
  { label: 'Материалы', to: RouteNames.Materials, icon: <BookOpen size={18} /> },
  { label: 'Тестирование', to: RouteNames.Tests, icon: <FlaskConical size={18} /> },
  { label: 'Расписание', to: RouteNames.Schedule, icon: <Calendar size={18} /> },
  { label: 'Чат', to: '/teacher/chat', icon: <MessageSquare size={18} /> },
  { label: 'Программы', to: RouteNames.Programs, icon: <Layers size={18} /> },
  { label: 'Учителя', to: '/teacher/teachers', icon: <GraduationCap size={18} /> },
];

type LinkProps = ComponentProps<typeof NavLink>;

export const Sidebar = ()=> {
  return (
    <nav aria-label="Sidebar">
      <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <UserBaseInfo />
        <Box component="ul" style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
          {items.map((item) => (
            <li key={item.label}>
              <SidebarLink to={item.to} end>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              </SidebarLink>
            </li>
          ))}
        </Box>
      </Box>
    </nav>
  );
};

const SidebarLink = ({ children, ...props }: LinkProps & { children: ReactNode })=> {
  return (
    <NavLink
      {...props}
      style={({ isActive }) => ({
        display: 'block',
        padding: '10px 12px',
        borderRadius: 8,
        color: 'var(--mantine-color-text)',
        textDecoration: 'none',
        backgroundColor: isActive ? 'var(--mantine-color-default-hover)' : 'transparent',
        fontWeight: isActive ? 600 : 500,
      })}
    >
      {children}
    </NavLink>
  );
};
