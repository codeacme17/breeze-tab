import { cn } from '@/lib/utils'
import { BaiduIcon, BingIcon, GoogleIcon } from '@/components/icons'
import { useState } from 'react'
import { DuckduckgoIcon } from '../icons/duckduckgo'

export type SearchEngine =
  | 'google'
  | 'bing'
  | 'baidu'
  | 'duckduckgo'
  | undefined

interface SearchEngineButtonsProps {
  searchEngine: SearchEngine
  setSearchEngine: (engine: SearchEngine) => void
}

export const SearchEngineButtons = ({
  searchEngine,
  setSearchEngine,
}: SearchEngineButtonsProps) => {
  const [searchEngineList, setSearchEngineList] = useState<SearchEngine[]>([
    'bing',
    'google',
    'baidu',
    'duckduckgo',
  ])

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
      `}>
      {searchEngineList.map((engine: SearchEngine) => (
        <div key={engine}>
          {engine === 'bing' ? (
            <BingIcon
              onClick={() => setSearchEngine('bing')}
              className={cn(
                'fill-muted-foreground/50 mr-2 cursor-pointer',
                searchEngine === 'bing' ? 'fill-primary' : '',
              )}
            />
          ) : engine === 'baidu' ? (
            <BaiduIcon
              onClick={() => setSearchEngine('baidu')}
              className={cn(
                'fill-muted-foreground/50 mr-2 cursor-pointer',
                searchEngine === 'baidu' ? 'fill-primary' : '',
              )}
            />
          ) : engine === 'google' ? (
            <GoogleIcon
              onClick={() => setSearchEngine('google')}
              className={cn(
                'fill-muted-foreground/50 mr-2 cursor-pointer',
                searchEngine === 'google' ? 'fill-primary' : '',
              )}
            />
          ) : engine === 'duckduckgo' ? (
            <DuckduckgoIcon
              onClick={() => setSearchEngine('duckduckgo')}
              className={cn(
                'fill-muted-foreground/50 mr-2 cursor-pointer',
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
