export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:3000',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
