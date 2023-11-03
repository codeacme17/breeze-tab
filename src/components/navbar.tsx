import { useTheme } from '@/contexts/theme-provider'
import { cn } from '@/lib/utils'
import { Sun, Moon } from 'lucide-react'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 py-4 px-7 w-full">
      <section className="flex justify-between items-center">
        <div>
          <img src="/logo.png" alt="" className="w-6" />
        </div>

        <div className="ml-auto flex items-center">
          <button
            className="shadow-inner bg-primary/5 rounded-full w-12 relative h-6"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <div
              className={cn(
                'p-0.5 rounded-full w-[20px] h-[20px] flex justify-center items-center ease-in duration-200',
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              )}>
              {theme === 'dark' ? (
                <Moon className="w-3 h-3 fill-current" />
              ) : (
                <Sun className="w-3 h-3" />
              )}
            </div>
          </button>
        </div>
      </section>
    </nav>
  )
}
