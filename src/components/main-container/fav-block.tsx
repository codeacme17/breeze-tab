import { useExpendFavStore } from '@/store'
import { FavList } from './fav-list'

export const FavBlock = () => {
  const isExpendFav = useExpendFavStore((state) => state.isExpendFav)

  return (
    <section className="flex w-full flex-col mt-3">
      {isExpendFav ? <FavList /> : null}
    </section>
  )
}
