import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'

import { ThemeProvider } from '@/contexts/theme-provider.tsx'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
