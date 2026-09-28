import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProgressProvider } from './context/UserProgressContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <UserProgressProvider>
          <App />
        </UserProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
