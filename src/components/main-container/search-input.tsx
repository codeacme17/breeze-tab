import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { SEARCH_ENGINE } from '@/lib/constants'

import { Search } from 'lucide-react'
import { BaiduIcon, BingIcon, GoogleIcon } from '@/components/icons'

type SearchEngine = 'google' | 'bing' | 'baidu'

export const SearchInput = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchEngine, setSearchEngine] = useState<SearchEngine>('bing')
  const [searchEngineUrl, setSearchEngineUrl] = useState<string>(
    SEARCH_ENGINE[searchEngine] || ''
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') switchEngine(e)
    if (e.key === 'Enter') runSearchEngine()
  }

  const runSearchEngine = () => {
    if (!searchInputRef.current || !searchInputRef.current.value.trim()) return
    const searchInput = searchInputRef.current.value.trim()
    const targetUrl = searchEngineUrl + searchInput
    window.location = targetUrl as unknown as Location
  }

  const switchEngine = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchEngine((prev: SearchEngine) => {
      if (prev === 'bing') return 'google'
      else if (prev === 'google') return 'baidu'
      else if (prev === 'baidu') return 'bing'
      return prev
    })
  }

  useEffect(() => {
    setSearchEngineUrl(SEARCH_ENGINE[searchEngine] || '')
  }, [searchEngine])

  return (
    <section className="w-[620px] relative">
      <label
        className="absolute left-0 top-0 z-10 flex justify-center items-center h-full w-14"
        htmlFor="search-input">
        <Search className="stroke-primary/70" />
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
          dark:border-primary/40
          dark:bg-primary/5
          placeholder:text-primary/30 
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
            'fill-primary/60 mr-2 cursor-pointer',
            searchEngine === 'bing' ? 'fill-blue-500' : ''
          )}
        />
        <GoogleIcon
          onClick={() => setSearchEngine('google')}
          classname={cn(
            'fill-primary/60 mr-2 cursor-pointer',
            searchEngine === 'google' ? 'fill-blue-500' : ''
          )}
        />
        <BaiduIcon
          onClick={() => setSearchEngine('baidu')}
          classname={cn(
            'fill-primary/60 cursor-pointer',
            searchEngine === 'baidu' ? 'fill-blue-500' : ''
          )}
        />
      </div>
    </section>
  )
}
