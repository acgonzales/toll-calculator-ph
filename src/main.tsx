import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/assets/app.css';
import { LocationProvider, SearchProvider, DirectionsProvider } from '@/stores';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocationProvider>
      <SearchProvider>
        <DirectionsProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </DirectionsProvider>
      </SearchProvider>
    </LocationProvider>
  </StrictMode>,
);
