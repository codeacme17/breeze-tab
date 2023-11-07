import { SearchInput } from './search-input'
import { useExpendFavStore } from '@/store'
import { FavList } from './fav-list'

export const MainContainer = () => {
  const isExpendFav = useExpendFavStore((state) => state.isExpendFav)

  return (
    <main className="flex w-[620px] mx-auto h-full flex-col items-center">
      <SearchInput />

      {isExpendFav ? <FavList /> : null}
    </main>
  )
}
