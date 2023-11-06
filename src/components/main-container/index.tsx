import { SearchInput } from './search-input'
import { FavBlock } from './fav-block'

export const MainContainer = () => {
  return (
    <main className="flex w-[620px] mx-auto h-full flex-col items-center">
      <SearchInput />
      <FavBlock />
    </main>
  )
}
