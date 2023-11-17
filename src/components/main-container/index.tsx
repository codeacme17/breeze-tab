import { SearchInput } from './search-input'
import { useFavStore } from '@/store'
import { FavList } from './fav-list'

export const MainContainer = () => {
  const isExpendFav = useFavStore((state) => state.isExpend)

  return (
    <main className="flex w-[620px] mx-auto h-full flex-col items-center">
      <SearchInput />

      {isExpendFav ? <FavList /> : null}
    </main>
  )
}
