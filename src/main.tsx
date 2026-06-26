import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { LangProvider } from './context/Language/LangProvider.tsx'
import { ThemeProvider } from './context/Theme/ThemeProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from './lib/analytics.ts'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LangProvider>

          <BrowserRouter>
            <Analytics />
            <div id="Body" className="bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
              <App />
            </div>
          </BrowserRouter>
        </LangProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
