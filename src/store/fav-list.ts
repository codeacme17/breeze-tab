import { DEFAUTL_FAV_LIST } from '@/lib/constants'
import { create } from 'zustand'

export type FavItem = {
  label: string
  url: string
  logoUrl?: string
  shortKey?: string
  searchField?: string
}

interface FavListState {
  favList: FavItem[]
  addFav: (fav: FavItem) => void
  modifyFav: (fav: FavItem) => void
  removeFav: (fav: FavItem) => void
}

export const useFavListStore = create<FavListState>((set) => {
  if (!localStorage.getItem('bz:fav-list'))
    localStorage.setItem('bz:fav-list', JSON.stringify(DEFAUTL_FAV_LIST))

  return {
    favList: JSON.parse(localStorage.getItem('bz:fav-list')!),
    addFav: (fav: FavItem) => {
      set((state) => {
        const favList = [...state.favList, fav]
        localStorage.setItem('bz:fav-list', JSON.stringify(favList))
        return { favList }
      })
    },
    modifyFav: (fav: FavItem) => {
      set((state) => {
        const favList = state.favList.map((item) => {
          if (item.url === fav.url) return fav
          return item
        })
        localStorage.setItem('bz:fav-list', JSON.stringify(favList))
        return { favList }
      })
    },
    removeFav: (fav: FavItem) => {
      set((state) => {
        const favList = state.favList.filter((item) => item.url !== fav.url)
        localStorage.setItem('bz:fav-list', JSON.stringify(favList))
        return { favList }
      })
    },
  }
})

interface ExpendFavState {
  isExpendFav: boolean
  troggleIsExpendFav: (is: boolean) => void
}

export const useExpendFavStore = create<ExpendFavState>((set) => ({
  isExpendFav: localStorage.getItem('bz:is-fav-expend') === 'true' || false,
  troggleIsExpendFav: (is: boolean) =>
    set(() => {
      localStorage.setItem('bz:is-fav-expend', is + '')
      return { isExpendFav: is }
    }),
}))