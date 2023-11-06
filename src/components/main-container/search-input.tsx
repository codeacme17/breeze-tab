import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { cn } from '@/lib/utils'
import { SEARCH_ENGINE } from '@/lib/constants'

import { Search } from 'lucide-react'
import { BaiduIcon, BingIcon, GoogleIcon } from '@/components/icons'

type SearchEngine = 'google' | 'bing' | 'baidu' | undefined

export const SearchInput = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchEngine, setSearchEngine] =
    useLocalStorage<SearchEngine>('bz:search-engine', 'bing')
  const [searchEngineUrl, setSearchEngineUrl] = useState<string>(
    SEARCH_ENGINE[searchEngine!] || ''
  )

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Tab') switchEngine(e)
    if (e.key === 'Enter') runSearchEngine()
  }

  const switchEngine = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (searchEngine === 'bing') setSearchEngine('google')
    else if (searchEngine === 'google') setSearchEngine('baidu')
    else if (searchEngine === 'baidu') setSearchEngine('bing')
  }

  const runSearchEngine = () => {
    if (
      !searchInputRef.current ||
      !searchInputRef.current.value.trim()
    )
      return
    const searchInput = searchInputRef.current.value.trim()
    const targetUrl = searchEngineUrl + searchInput
    window.location = targetUrl as unknown as Location
  }

  useEffect(() => {
    setSearchEngineUrl(SEARCH_ENGINE[searchEngine!] || '')
  }, [searchEngine])

  return (
    <section className="w-[620px] relative">
      <label
        className="absolute left-0 top-0 z-10 flex justify-center items-center h-full w-14"
        htmlFor="search-input">
        <Search className="stroke-muted-foreground/50" />
      </label>

      {/* Searh Input */}
      <input
        id="search-input"
        ref={searchInputRef}
        onKeyDown={handleKeyDown}
        type="text"
        className={cn(` 
          w-full 
          h-12 
          pl-14
          pr-32 
          text-base 
          font-light
          outline-none 
          rounded-3xl 
          ease-in-out 
          duration-200 
          shadow-inner 
          border-[1px]
          bg-background/60
          dark:border-background-foreground
          placeholder:text-muted-foreground/50 
          placeholder:text-sm 
          placeholder:select-none 
          focus:rounded-md`)}
        placeholder="Breezing through the web"
      />

      {/* Search Engien Buttons */}
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
          transition-[fill,opacity]`}>
        <BingIcon
          onClick={() => setSearchEngine('bing')}
          classname={cn(
            'fill-muted-foreground/50 mr-2 cursor-pointer',
            searchEngine === 'bing' ? 'fill-primary' : ''
          )}
        />
        <GoogleIcon
          onClick={() => setSearchEngine('google')}
          classname={cn(
            'fill-muted-foreground/50 mr-2 cursor-pointer',
            searchEngine === 'google' ? 'fill-primary' : ''
          )}
        />
        <BaiduIcon
          onClick={() => setSearchEngine('baidu')}
          classname={cn(
            'fill-muted-foreground/50 cursor-pointer',
            searchEngine === 'baidu' ? 'fill-primary' : ''
          )}
        />
      </div>
    </section>
  )
}
