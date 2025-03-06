import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { SearchProvider } from '@/contexts/SearchContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/assets/app.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SearchProvider>
  </StrictMode>,
);
