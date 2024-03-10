import browser from 'webextension-polyfill'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { SEARCH_ENGINES } from '@/lib/constants'
import { FavItem, useFavStore, useSearchStore } from '@/store'

import { Search } from 'lucide-react'
import { SearchEngineButtons } from './search-engine-buttons'

export const SearchInput = () => {
  const favList = useFavStore((state) => state.favList)
  const isExpendFav = useFavStore((state) => state.isExpend)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchEngineList = useSearchStore((state) => state.searchEngineList)

  const [inputValue, setInputValue] = useState('')
  const searchEngine = useSearchStore((state) => state.searchEngine)
  const setSearchEngine = useSearchStore((state) => state.setSearchEngine)

  const [searchEngineUrl, setSearchEngineUrl] = useState<string>(
    SEARCH_ENGINES[searchEngine!],
  )

  // Current Fav Item is user enter the shortkey whitch is match the fav item
  const [currentFavItem, setCurrentFavItem] = useState<FavItem | null>()
  const [isSeachFieldFocus, setIsSeachFieldFocus] = useState(false)

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
      (item) => item.shortKey === inputValue.toLowerCase(),
    )
    setCurrentFavItem(matchItem || null)
  }

  const checkIsSearchField = (chunks: string[]) => {
    const matchItem = favList.find(
      (item) => item.shortKey === chunks[0].toLowerCase(),
    )
    if (!matchItem?.searchField) return
    setCurrentFavItem(matchItem)
    setIsSeachFieldFocus(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') switchEngine(e)
    if (e.key === 'Enter') handleEnter(e)
  }

  let index = searchEngineList.indexOf(searchEngine!)
  const switchEngine = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (index === searchEngineList.length - 1) {
      index = 0
      setSearchEngine(searchEngineList[index])
    } else setSearchEngine(searchEngineList[++index])
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 229) return

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
      const targetUrl = currentFavItem.url
      const searchField = currentFavItem.searchField
      const searchContent = chunks?.slice(1).join('').trim()

      const searchUrl = targetUrl.endsWith('/')
        ? `${targetUrl}${searchField}${searchContent}`
        : `${targetUrl}/${searchField}${searchContent}`

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
    setSearchEngineUrl(SEARCH_ENGINES[searchEngine!] || '')
  }, [searchEngine])

  return (
    <section
      className={cn(
        'w-full relative transition-[margin]',
        isExpendFav ? 'mt-40' : 'mt-56',
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
        autoComplete="off"
        onChange={handleInputChange}
        type="text"
        className={cn(
          ` 
          w-full 
          h-12 
          pl-14
          pr-32 
          text-base 
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
          isSeachFieldFocus && 'border-primary',
        )}
        placeholder={browser.i18n.getMessage('input_placeholder')}
      />

      {/* Search Engine Buttons */}
      <SearchEngineButtons />
    </section>
  )
}
