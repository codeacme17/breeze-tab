import { create } from 'zustand'

interface LocalState {
  isExpendFav: boolean
  troggleIsExpendFav: (is: boolean) => void
}

export const useLocalStore = create<LocalState>((set) => ({
  isExpendFav:
    localStorage.getItem('bz:is-fav-expend') === 'true' || false,
  troggleIsExpendFav: (is: boolean) =>
    set(() => {
      localStorage.setItem('bz:is-fav-expend', is + '')
      return { isExpendFav: is }
    }),
}))
