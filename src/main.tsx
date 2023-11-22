import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@/contexts/theme-provider.tsx'

import './global.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="light">
    <App />
  </ThemeProvider>
)
