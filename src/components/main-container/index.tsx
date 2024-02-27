import { SearchInput } from './search-input'
import { FavList } from './fav-list'

export const MainContainer = () => {
  return (
    <main className="flex w-[620px] mx-auto h-full flex-col items-center">
      <SearchInput />
      <FavList />
    </main>
  )
}
