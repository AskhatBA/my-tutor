export const ViewMode = {
  Week: 'week',
  Month: 'month',
} as const;

export type ViewMode = typeof ViewMode[keyof typeof ViewMode]
