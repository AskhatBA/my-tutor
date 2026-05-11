import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ViewMode } from './types';

const SCHEDULE_CALENDAR_STORE = 'schedule-calendar-store';

interface ScheduleCalendarStore {
  mode: ViewMode
  setMode: (mode: ViewMode) => void
  currentDate: Date
  setCurrentDate: (date: Date) => void
}

export const useScheduleCalendarStore = create<ScheduleCalendarStore>()(
  persist(
    (set) => ({
      mode: ViewMode.Week,
      setMode: (mode) => set({ mode }),
      currentDate: new Date(),
      setCurrentDate: (date) => set({ currentDate: date }),
    }),
    { name: SCHEDULE_CALENDAR_STORE },
  ),
);
