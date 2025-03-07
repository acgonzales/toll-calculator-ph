import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/assets/app.css';
import { LocationProvider, SearchProvider } from '@/stores';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocationProvider>
      <SearchProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SearchProvider>
    </LocationProvider>
  </StrictMode>,
);
