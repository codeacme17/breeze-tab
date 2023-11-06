import { useLocalStore } from '@/store'
import { FavList } from './fav-list'

import { ChevronsDown, ChevronsUp } from 'lucide-react'
import { Button } from '../ui/button'

export const FavBlock = () => {
  const isExpendFav = useLocalStore((state) => state.isExpendFav)
  const troggleIsExpendFav = useLocalStore(
    (state) => state.troggleIsExpendFav
  )

  return (
    <section className="flex w-full flex-col mt-3">
      <Button
        variant="ghost"
        size="icon"
        className="w-full h-5"
        onClick={() =>
          troggleIsExpendFav(isExpendFav ? false : true)
        }>
        {isExpendFav ? (
          <ChevronsUp className="w-5 h-5 stroke-muted-foreground/30" />
        ) : (
          <ChevronsDown className="w-5 h-5 stroke-muted-foreground/30" />
        )}
      </Button>

      {isExpendFav ? <FavList /> : <FavList />}
    </section>
  )
}
