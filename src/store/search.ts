import { create } from 'zustand'

export type SearchEngine =
  | 'google'
  | 'bing'
  | 'baidu'
  | 'duckduckgo'
  | undefined

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
