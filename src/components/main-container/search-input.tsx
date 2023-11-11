import { useEffect, useRef, useState } from 'react'
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

  const [searchEngine, setSearchEngine] = useLocalStorage<SearchEngine>(
    'bz:search-engine',
    'bing'
  )
  const [searchEngineUrl, setSearchEngineUrl] = useState<string>(
    SEARCH_ENGINE[searchEngine!] || ''
  )

  const favList = useFavListStore((state) => state.favList)

  // Current Fav Item is user enter the shortkey whitch is match the fav item
  const [currentFavItem, setCurrentFavItem] = useState<FavItem | null>()
  const [isSeachFieldFocus, setIsSeachFieldFocus] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setCurrentFavItem(null)
    setIsSeachFieldFocus(false)

    const _inputValue = e.target.value.trim()
    if (!_inputValue) return

    // Redirect to the fav item url
    const chunks = _inputValue.split(':')
    if (!!chunks[0].trim() && chunks.length > 1) {
      checkIsSearchField(chunks)
    } else checkIsShortKey(_inputValue)
  }

  const checkIsShortKey = (inputValue: string) => {
    const matchItem = favList.find(
      (item) => item.shortKey === inputValue.toLowerCase()
    )
    setCurrentFavItem(matchItem || null)
  }

  const checkIsSearchField = (chunks: string[]) => {
    const matchItem = favList.find(
      (item) => item.shortKey === chunks[0].toLowerCase()
    )
    if (!matchItem?.searchField) return
    setCurrentFavItem(matchItem)
    setIsSeachFieldFocus(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') switchEngine(e)
    if (e.key === 'Enter') handleEnter()
  }

  const switchEngine = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (searchEngine === 'bing') setSearchEngine('google')
    else if (searchEngine === 'google') setSearchEngine('baidu')
    else if (searchEngine === 'baidu') setSearchEngine('bing')
  }

  const handleEnter = () => {
    // Redirect to the normal url
    if (
      inputValue.trim().toLocaleLowerCase().startsWith('http://') ||
      inputValue.trim().toLocaleLowerCase().startsWith('https://')
    )
      return window.location.assign(inputValue)

    // Normal search by search engine
    if (!currentFavItem) return runSearchEngine()

    // Redirect to the fav item url
    if (!isSeachFieldFocus) return window.location.assign(currentFavItem.url)

    // Redirect to the fav item search field url
    if (isSeachFieldFocus) {
      const chunks = searchInputRef.current?.value.split(':')
      const searchUrl =
        currentFavItem.url +
        '/' +
        currentFavItem.searchField +
        chunks![1].trim()
      window.location.assign(searchUrl)
    }
  }

  const runSearchEngine = () => {
    if (!searchInputRef.current || !searchInputRef.current.value.trim()) return
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
            src={currentFavItem.logoUrl || currentFavItem.canvasLogoUrl}
            onError={(e: any) => (e.target.src = currentFavItem.canvasLogoUrl)}
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
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        type="text"
        className={cn(
          ` 
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
          border-muted-foreground/80
          bg-transparent
          placeholder:text-muted-foreground/50 
          placeholder:text-base 
          placeholder:select-none 
          focus:rounded-md`,
          isSeachFieldFocus && 'border-primary'
        )}
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
