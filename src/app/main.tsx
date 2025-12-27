import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from './providers/MantineProvider';
import { QueryProvider } from './providers/QueryProvider';
import { StoreProvider } from './providers/StoreProvider';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import './styles/global.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorSchemeScript defaultColorScheme="light" />
    <MantineProvider>
      <QueryProvider>
        <StoreProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StoreProvider>
      </QueryProvider>
    </MantineProvider>
  </StrictMode>,
);
