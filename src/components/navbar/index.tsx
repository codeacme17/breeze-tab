import { useState } from 'react'
import { version } from '../../../package.json'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { AlignLeft, AlignRight, Github } from 'lucide-react'
import { SettingMenu } from './setting-menu'

export const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav className="fixed top-0 py-4 px-7 w-full">
      <section className="flex justify-between items-center">
        {/* Logo & Product Detail Dialog */}
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
                  window.open(
                    'https://github.com/codeacme17/breeze-tab'
                  )
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

        {/* Right Buttons */}
        <div className="ml-auto flex items-center">
          {/* Side Bar Trigger Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 mr-5"
            onClick={() => setIsExpanded(isExpanded ? false : true)}>
            {isExpanded ? (
              <AlignLeft className="w-5 h-5 stroke-muted-foreground/60" />
            ) : (
              <AlignRight className="w-5 h-5 stroke-muted-foreground/60" />
            )}
          </Button>

          {/* Settings Menu */}
          <SettingMenu />
        </div>
      </section>
    </nav>
  )
}