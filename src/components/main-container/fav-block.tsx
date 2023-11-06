import { useLocalStore } from '@/store'
import { FavToggleBtn } from './fav-toggle-btn'
import { FavList } from './fav-list'

export const FavBlock = () => {
  const isExpendFav = useLocalStore((state) => state.isExpendFav)

  return (
    <section className="flex w-full flex-col mt-3">
      <FavToggleBtn />

      {isExpendFav ? <FavList /> : <FavList />}
    </section>
  )
}
