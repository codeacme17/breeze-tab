import { useState } from 'react'
import { useTheme } from '@/contexts/theme-provider'
import { cn } from '@/lib/utils'
import { Sun, Moon, AlignLeft, AlignRight } from 'lucide-react'
import { Button } from './ui/button'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()

  const [isExpanded, setIsExpanded] = useState(false)

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
                'p-0.5 rounded-full w-[26px] h-[20px] flex justify-center items-center ease-in duration-200',
                theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
              )}>
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 stroke-1" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </div>
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 ml-4"
            onClick={() => setIsExpanded(isExpanded ? false : true)}>
            {isExpanded ? (
              <AlignLeft className="w-6 h-6" />
            ) : (
              <AlignRight className="w-6 h-6 stroke-primary/60" />
            )}
          </Button>
        </div>
      </section>
    </nav>
  )
}
