import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { cn } from '@/lib/utils'
import { SEARCH_ENGINE } from '@/lib/constants'
import { FavItem, useExpendFavStore, useFavListStore } from '@/store'

import { Search } from 'lucide-react'
import { BaiduIcon, BingIcon, GoogleIcon } from '@/components/icons'

type SearchEngine = 'google' | 'bing' | 'baidu' | undefined

export const SearchInput = () => {
  const isExpendFav = useExpendFavStore((state) => state.isExpendFav)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchEngine, setSearchEngine] =
    useLocalStorage<SearchEngine>('bz:search-engine', 'bing')
  const [searchEngineUrl, setSearchEngineUrl] = useState<string>(
    SEARCH_ENGINE[searchEngine!] || ''
  )

  const favList = useFavListStore((state) => state.favList)

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Tab') switchEngine(e)
    if (e.key === 'Enter') handleEnter(e)
  }

  const switchEngine = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (searchEngine === 'bing') setSearchEngine('google')
    else if (searchEngine === 'google') setSearchEngine('baidu')
    else if (searchEngine === 'baidu') setSearchEngine('bing')
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!currentFavItem) return runSearchEngine()
    window.location.assign(currentFavItem.url)
  }

  const [currentFavItem, setCurrentFavItem] =
    useState<FavItem | null>()
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.value.trim()) return

    const shortKey = e.target.value.trim().toLowerCase()
    const target = favList.find((item) => item.shortKey === shortKey)
    if (target) setCurrentFavItem(target)
    else setCurrentFavItem(null)
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
    <section
      className={cn(
        'w-full relative transition-[margin]',
        isExpendFav ? 'mt-40' : 'mt-56'
      )}>
      <label
        className="absolute left-0 top-0 z-10 flex justify-center items-center h-full w-14"
        htmlFor="search-input">
        {currentFavItem ? (
          <img
            src={
              currentFavItem.logoUrl || currentFavItem.canvasLogoUrl
            }
            onError={(e: any) =>
              (e.target.src = currentFavItem.canvasLogoUrl)
            }
            className="w-6 h-6"
          />
        ) : (
          <Search className="stroke-muted-foreground/50" />
        )}
      </label>

      {/* Searh Input */}
      <input
        id="search-input"
        ref={searchInputRef}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
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
          placeholder:text-base 
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
            searchEngine === 'bing' ? 'fill-primary/70' : ''
          )}
        />
        <GoogleIcon
          onClick={() => setSearchEngine('google')}
          classname={cn(
            'fill-muted-foreground/50 mr-2 cursor-pointer',
            searchEngine === 'google' ? 'fill-primary/70' : ''
          )}
        />
        <BaiduIcon
          onClick={() => setSearchEngine('baidu')}
          classname={cn(
            'fill-muted-foreground/50 cursor-pointer',
            searchEngine === 'baidu' ? 'fill-primary/70' : ''
          )}
        />
      </div>
    </section>
  )
}
