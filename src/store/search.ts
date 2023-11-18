import { create } from 'zustand'
import { SEARCH_ENGINES } from '@/lib/constants'

export type SearchEngine = keyof typeof SEARCH_ENGINES

interface SearchState {
  searchEngineList: SearchEngine[]
  setSearchEngineList: (searchList: SearchEngine[]) => void
}

export const useSearchStore = create<SearchState>((set) => {
  if (!localStorage.getItem('dz:search-engine-list')) {
    localStorage.setItem(
      'dz:search-engine-list',
      JSON.stringify(['google', 'bing', 'baidu']),
    )
  }

  return {
    searchEngineList:
      JSON.parse(localStorage.getItem('dz:search-engine-list')!) || [],

    setSearchEngineList: (searchEngineList: SearchEngine[]) => {
      set((state) => {
        state.searchEngineList = searchEngineList
        return { searchEngineList }
      })
    },
  }
})
