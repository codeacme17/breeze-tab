import { create } from 'zustand'
import { SEARCH_ENGINES } from '@/lib/constants'

export type SearchEngine = keyof typeof SEARCH_ENGINES

interface SearchState {
  searchEngine: SearchEngine
  setSearchEngine: (searchEngine: SearchEngine) => void
  searchEngineList: SearchEngine[]
  setSearchEngineList: (searchList: SearchEngine[]) => void
}

export const useSearchStore = create<SearchState>((set) => {
  if (!localStorage.getItem('dz:search-engine-list')) {
    localStorage.setItem(
      'dz:search-engine-list',
      JSON.stringify(['bing', 'google', 'baidu']),
    )
  }

  if (!localStorage.getItem('dz:search-engine')) {
    localStorage.setItem('dz:search-engine', 'google')
  }

  return {
    searchEngine: localStorage.getItem('dz:search-engine') as SearchEngine,

    searchEngineList: JSON.parse(
      localStorage.getItem('dz:search-engine-list')!,
    ),

    setSearchEngine: (searchEngine: SearchEngine) => {
      set((state) => {
        state.searchEngine = searchEngine
        localStorage.setItem('dz:search-engine', searchEngine)
        return { searchEngine }
      })
    },

    setSearchEngineList: (searchEngineList: SearchEngine[]) => {
      set((state) => {
        state.searchEngineList = searchEngineList
        localStorage.setItem(
          'dz:search-engine-list',
          JSON.stringify(searchEngineList),
        )
        return { searchEngineList }
      })
    },
  }
})
