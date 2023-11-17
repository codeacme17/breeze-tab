import { create } from 'zustand'
import { DEFAUTL_FAV_LIST } from '@/lib/constants'
import { handleFavItem } from '@/lib/handle-fav-item'

export type FavItem = {
  id: string
  label: string
  url: string
  logoUrl?: string
  shortKey?: string
  searchField?: string
  canvasLogoUrl?: string
}

interface FavState {
  favList: FavItem[]
  isExpend: boolean
  setFavList: (favList: FavItem[]) => void
  addFav: (fav: FavItem) => void
  modifyFav: (fav: FavItem) => void
  removeFav: (fav: FavItem) => void
  troggleExpend: (is: boolean) => void
}

export const useFavStore = create<FavState>((set) => {
  if (!localStorage.getItem('bz:fav-list'))
    localStorage.setItem('bz:fav-list', JSON.stringify(DEFAUTL_FAV_LIST))

  return {
    favList: JSON.parse(localStorage.getItem('bz:fav-list')!),

    isExpend: localStorage.getItem('bz:is-fav-expend') === 'true' || false,

    setFavList: (favList: FavItem[]) => {
      set((state) => {
        localStorage.setItem('bz:fav-list', JSON.stringify(favList))
        state.favList = favList
        return { favList }
      })
    },

    addFav: (fav: FavItem) => {
      set((state) => {
        fav = handleFavItem(fav)
        const favList = [...state.favList, fav]
        localStorage.setItem('bz:fav-list', JSON.stringify(favList))
        return { favList }
      })
    },

    modifyFav: (fav: FavItem) => {
      set((state) => {
        const favList = state.favList.map((item) => {
          if (item.id === fav.id) return fav
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

    troggleExpend: (is: boolean) =>
      set(() => {
        localStorage.setItem('bz:is-fav-expend', is + '')
        return { isExpend: is }
      }),
  }
})
