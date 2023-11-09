import ReactDOM from 'react-dom/client'
import Popup from './popup.tsx'
import '@/global.css'

import { ThemeProvider } from '@/contexts/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="light">
    <Popup />
  </ThemeProvider>
)
