import { cn } from '@/lib/utils'
import { SearchEngine, useSearchStore } from '@/store'

import {
  BaiduIcon,
  BingIcon,
  GoogleIcon,
  DuckduckgoIcon,
} from '@/components/icons'

interface SearchEngineIconProps {
  engine: SearchEngine
  selected: boolean
  hanldeClick: (engine: SearchEngine) => void
}

export const SearchEngineButtons = () => {
  const searchEngine = useSearchStore((state) => state.searchEngine)
  const searchEngineList = useSearchStore((state) => state.searchEngineList)
  const setSearchEngine = useSearchStore((state) => state.setSearchEngine)

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
