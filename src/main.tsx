import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { ThemeProvider } from '@/contexts/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="light">
    <App />
  </ThemeProvider>,
)
