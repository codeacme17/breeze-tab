import { useLocalStore } from '@/store'

import { ChevronsDown, ChevronsUp } from 'lucide-react'
import { Button } from '../ui/button'

export const FavToggleBtn = () => {
  const isExpendFav = useLocalStore((state) => state.isExpendFav)
  const troggleIsExpendFav = useLocalStore(
    (state) => state.troggleIsExpendFav
  )

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-full h-5"
      onClick={() => troggleIsExpendFav(isExpendFav ? false : true)}>
      {isExpendFav ? (
        <ChevronsUp className="w-5 h-5 stroke-muted-foreground/30" />
      ) : (
        <ChevronsDown className="w-5 h-5 stroke-muted-foreground/30" />
      )}
    </Button>
  )
}
