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
        <div key={engine} className="fill-muted-foreground/50 cursor-pointer">
          {engine === 'bing' ? (
            <BingIcon
              onClick={() => setSearchEngine('bing')}
              className={cn(searchEngine === 'bing' ? 'fill-primary' : '')}
            />
          ) : engine === 'baidu' ? (
            <BaiduIcon
              onClick={() => setSearchEngine('baidu')}
              className={cn(searchEngine === 'baidu' ? 'fill-primary' : '')}
            />
          ) : engine === 'google' ? (
            <GoogleIcon
              onClick={() => setSearchEngine('google')}
              className={cn(searchEngine === 'google' ? 'fill-primary' : '')}
            />
          ) : engine === 'duckduckgo' ? (
            <DuckduckgoIcon
              onClick={() => setSearchEngine('duckduckgo')}
              className={cn(
                searchEngine === 'duckduckgo' ? 'fill-primary' : '',
              )}
            />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  )
}
