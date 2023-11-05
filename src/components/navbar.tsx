import { useState } from 'react'
import { useTheme } from '@/contexts/theme-provider'
import { cn } from '@/lib/utils'
import { version } from '../../package.json'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Sun, Moon, AlignLeft, AlignRight, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav className="fixed top-0 py-4 px-7 w-full">
      <section className="flex justify-between items-center">
        <Dialog>
          <DialogTrigger>
            <img
              src="/logo.png"
              alt="Breeze Tab Logo"
              className="w-6 select-none"
            />
          </DialogTrigger>
          <DialogContent className="bg-background">
            <DialogHeader className="-mt-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  window.open('https://github.com/codeacme17/breeze-tab')
                }>
                <Github className="w-4 h-4" />
              </Button>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center text-foreground -mt-5">
              <div className="mb-4 w-24 h-24 relative">
                <img
                  src="/logo.png"
                  alt="Breeze Tab Logo"
                  className="w-24 absolute z-10"
                />
                <img
                  src="/logo.png"
                  alt="Breeze Tab Logo"
                  className="w-24 blur-lg absolute"
                />
              </div>
              <h2 className="text-2xl">Breeze Tab</h2>
              <p className="text-sm mt-1">
                <code className="ml-1 px-2 py-0.5 bg-secondary-foreground/30 rounded-lg">
                  v{version}
                </code>
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <div className="ml-auto flex items-center">
          <button
            className="shadow-inner bg-muted-foreground/5 rounded-full w-12 relative h-6"
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
            className="w-8 h-8 ml-4"
            onClick={() => setIsExpanded(isExpanded ? false : true)}>
            {isExpanded ? (
              <AlignLeft className="w-6 h-6 stroke-primary" />
            ) : (
              <AlignRight className="w-6 h-6 stroke-muted-foreground/60" />
            )}
          </Button>
        </div>
      </section>
    </nav>
  )
}
