import { useTheme } from '@/contexts/theme-provider'
import { useLocalStorage } from 'react-use'
import { cn } from '@/lib/utils'
import { useLocalStore } from '@/store'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Settings, Moon, Layers2, Check } from 'lucide-react'

export const SettingMenu = () => {
  const { theme, setTheme } = useTheme()
  const isExpendFav = useLocalStore((state) => state.isExpendFav)
  const troggleIsExpendFav = useLocalStore(
    (state) => state.troggleIsExpendFav
  )

  const [color, setColor] = useLocalStorage('color', 'red')

  const colorMap = ['gray', 'red', 'blue']

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Settings className="w-5 h-5 stroke-muted-foreground/60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>Setting</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Dark Mode */}
        <DropdownMenuItem
          className="flex justify-between cursor-pointer"
          onClick={() =>
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }>
          <div className="flex items-center">
            <Moon className="w-4 h-4 mr-2" /> Dark Mode
          </div>
          <Switch checked={theme === 'dark'} />
        </DropdownMenuItem>

        {/* Show Shortcut */}
        <DropdownMenuItem
          className="flex justify-between cursor-pointer"
          onClick={() => troggleIsExpendFav(!isExpendFav)}>
          <div className="flex items-center">
            <Layers2 className="w-4 h-4 mr-2" /> Show Shortcut
          </div>
          <Switch checked={isExpendFav} />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Colors switch */}
        <DropdownMenuLabel>Color</DropdownMenuLabel>
        <DropdownMenuItem>
          {colorMap.map((item) => (
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs border-transparent"
              data-state="closed"
              onClick={() => setColor(item)}>
              <span
                className={cn(
                  `flex h-6 w-6 items-center justify-center rounded-full bg-${item}-500`,
                  {
                    'border-2 border-foreground/70': color === item,
                  }
                )}>
                {color === item && <Check className="w-3 h-3" />}
              </span>
            </button>
          ))}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
