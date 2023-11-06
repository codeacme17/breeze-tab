import { useTheme } from '@/contexts/theme-provider'
import { useLocalStorage } from 'react-use'
import { cn } from '@/lib/utils'
import { useExpendFavStore } from '@/store'
import { COLORS } from '@/lib/constants'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { Settings, Moon, Layers2, Check } from 'lucide-react'
import { useEffect, useState } from 'react'

type Color = keyof typeof COLORS

export const SettingMenu = () => {
  const { theme, setTheme } = useTheme()
  const isExpendFav = useExpendFavStore((state) => state.isExpendFav)
  const troggleIsExpendFav = useExpendFavStore(
    (state) => state.troggleIsExpendFav
  )

  const [color, setColor] = useLocalStorage<Color>('color', 'gray')
  const [colorCollection, setColorCollection] = useState<string[]>([])

  useEffect(() => {
    const colorMap = []
    for (const key in COLORS) colorMap.push(key)
    setColorCollection(colorMap)
  }, [])

  useEffect(() => {
    const head = document.getElementsByTagName('head')[0]
    const existingStylesheet = document.getElementById('SYN_CSS')
    existingStylesheet && existingStylesheet.remove()

    const stylesheet = document.createElement('style')
    stylesheet.id = 'SYN_CSS'
    stylesheet.innerText = COLORS[color!].value
    head.appendChild(stylesheet)
  }, [color])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings className="w-5 h-5 stroke-muted-foreground/60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 bg-background">
        <DropdownMenuLabel>Setting</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Dark Mode */}
        <DropdownMenuItem
          className="flex justify-between cursor-pointer"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
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
          {colorCollection.map((item) => (
            <button
              className="flex h-7 w-7 mr-2 items-center justify-center rounded-full border-[1px] border-foreground/30"
              data-state="closed"
              key={item}
              onClick={() => setColor(item as Color)}>
              <span
                className={cn(
                  `flex h-7 w-7 items-center justify-center rounded-full`,
                  {
                    'border-2 border-foreground/70': color === item,
                  }
                )}
                style={{
                  backgroundColor: COLORS[item as Color].main,
                }}>
                {color === item && <Check className="w-3 h-3" />}
              </span>
            </button>
          ))}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
