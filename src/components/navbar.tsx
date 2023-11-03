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
            <img src="/logo.png" alt="Breeze Tab Logo" className="w-6" />
          </DialogTrigger>
          <DialogContent className="bg-primary/10">
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

            <div className="flex flex-col items-center justify-center text-primary/60 space-y-0 -mt-6">
              <div className="mb-2">
                <img src="/logo.png" alt="Breeze Tab Logo" className="w-24" />
              </div>
              <h2 className="text-2xl">Breeze Tab</h2>
              <p className="text-sm">
                version
                <code className="ml-1 px-2 py-0.5 bg-primary/30 rounded-lg">
                  v{version}
                </code>
              </p>
            </div>
          </DialogContent>
        </Dialog>

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
