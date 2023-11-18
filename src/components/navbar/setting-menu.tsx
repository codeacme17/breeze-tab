import browser from 'webextension-polyfill'
import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/theme-provider'
import { useLocalStorage } from 'react-use'
import { cn } from '@/lib/utils'
import { SearchEngine, useFavStore, useSearchStore } from '@/store'
import { COLORS } from '@/lib/colors'
import { SEARCH_ENGINES } from '@/lib/constants'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Settings, Moon, Layers2, Check } from 'lucide-react'

type Color = keyof typeof COLORS

export const SettingMenu = () => {
  const { theme, setTheme } = useTheme()
  const isExpendFav = useFavStore((state) => state.isExpend)
  const troggleIsExpendFav = useFavStore((state) => state.troggleExpend)

  const [color, setColor] = useLocalStorage<Color>('color', 'gray')
  const [colorCollection, setColorCollection] = useState<string[]>([])
  const searchEngine = useSearchStore((state) => state.searchEngine)
  const setSearchEngine = useSearchStore((state) => state.setSearchEngine)
  const searchEngineList = useSearchStore((state) => state.searchEngineList)
  const setSearchEngineList = useSearchStore(
    (state) => state.setSearchEngineList,
  )

  const handleCheckedChange = (checked: boolean, engine: SearchEngine) => {
    if (searchEngineList.length === 1 && !checked) return
    if (searchEngineList.length === 3 && checked) return

    if (checked) {
      setSearchEngineList([...searchEngineList, engine])
    } else {
      const newSearchEngineList = searchEngineList.filter(
        (item) => item !== engine,
      )
      setSearchEngineList(newSearchEngineList)
      if (searchEngine === engine) setSearchEngine(newSearchEngineList[0])
    }
  }

  const disableCheckBoxState = (engine: SearchEngine) => {
    return (
      (searchEngineList.length === 1 && searchEngineList[0] === engine) ||
      (searchEngineList.length === 3 && !searchEngineList.includes(engine))
    )
  }

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
        <DropdownMenuLabel>
          {browser.i18n.getMessage('setting_title')}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Dark Mode */}
        <DropdownMenuItem
          className="flex justify-between cursor-pointer"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <div className="flex items-center">
            <Moon className="w-4 h-4 mr-2" />
            {browser.i18n.getMessage('setting_dark_mode')}
          </div>
          <Switch checked={theme === 'dark'} />
        </DropdownMenuItem>

        {/* Show Shortcut */}
        <DropdownMenuItem
          className="flex justify-between cursor-pointer"
          onClick={() => troggleIsExpendFav(!isExpendFav)}>
          <div className="flex items-center">
            <Layers2 className="w-4 h-4 mr-2" />
            {browser.i18n.getMessage('setting_show_fav_list')}
          </div>
          <Switch checked={isExpendFav} />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Seach Engines */}
        <DropdownMenuLabel>
          {browser.i18n.getMessage('setting_search_engine')}
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex flex-col justify-start items-start gap-1">
          {Object.keys(SEARCH_ENGINES).map((engine) => (
            <div key={engine} className="flex">
              <Checkbox
                id={engine}
                checked={searchEngineList?.includes(engine as SearchEngine)}
                onCheckedChange={(checked: boolean) =>
                  handleCheckedChange(checked, engine as SearchEngine)
                }
                disabled={disableCheckBoxState(engine as SearchEngine)}
              />
              <label
                htmlFor={engine}
                className={cn(
                  'ml-2 cursor-pointer',
                  disableCheckBoxState(engine as SearchEngine) &&
                    'cursor-not-allowed text-muted-foreground',
                )}>
                {engine.charAt(0).toUpperCase() + engine.slice(1)}
              </label>
            </div>
          ))}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Colors switch */}
        <DropdownMenuLabel>
          {browser.i18n.getMessage('setting_color')}
        </DropdownMenuLabel>
        <DropdownMenuItem>
          {colorCollection.map((item) => (
            <button
              className="flex mr-2 items-center justify-center rounded-full"
              data-state="closed"
              key={item}
              onClick={() => setColor(item as Color)}>
              <span
                className={cn(
                  `flex h-7 w-7 items-center justify-center rounded-full border-2 border-foreground/20`,
                  {
                    'border-2 border-foreground/100': color === item,
                  },
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
