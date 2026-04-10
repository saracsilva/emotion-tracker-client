import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SessionContextProvider from './context/SessionContext';
import './index.css';
import App from './App';
import StreakContextProvider from './context/StreakContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <StreakContextProvider>
          <App />
        </StreakContextProvider>
      </SessionContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
