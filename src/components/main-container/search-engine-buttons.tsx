import { cn } from '@/lib/utils'
import { SearchEngine, useSearchStore } from '@/store'

import {
  BaiduIcon,
  BingIcon,
  GoogleIcon,
  DuckduckgoIcon,
} from '@/components/icons'

interface SearchEngineButtonsProps {
  searchEngine: SearchEngine
  setSearchEngine: (engine: SearchEngine) => void
}

interface SearchEngineIconProps {
  engine: SearchEngine
  selected: boolean
  hanldeClick: (engine: SearchEngine) => void
}

export const SearchEngineButtons = ({
  searchEngine,
  setSearchEngine,
}: SearchEngineButtonsProps) => {
  const searchEngineList = useSearchStore((state) => state.searchEngineList)

  return (
    <div
      className={`
        absolute 
        top-1/2 
        -translate-y-1/2 
        right-4 
        flex 
        items-center 
        ease-in-out 
        duration-300 
        transition-[fill,opacity]
        gap-2
      `}>
      {searchEngineList.map((engine: SearchEngine) => (
        <SearchEngineIcon
          key={engine}
          engine={engine}
          selected={engine === searchEngine}
          hanldeClick={setSearchEngine}
        />
      ))}
    </div>
  )
}

const SearchEngineIcon = ({
  engine,
  selected,
  hanldeClick,
}: SearchEngineIconProps) => {
  const icons = {
    bing: BingIcon,
    baidu: BaiduIcon,
    google: GoogleIcon,
    duckduckgo: DuckduckgoIcon,
  }

  const IconComponent = icons[engine]

  return (
    <IconComponent
      onClick={() => hanldeClick(engine)}
      className={cn(
        selected ? 'fill-primary' : 'fill-muted-foreground/50',
        'cursor-pointer',
      )}
    />
  )
}
