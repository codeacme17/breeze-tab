import { useLocalStorage } from 'react-use'

import { ChevronsDown, ChevronsUp } from 'lucide-react'
import { Button } from '../ui/button'

export const FavBlock = () => {
  const [isExpend, setIsExpend] = useLocalStorage(
    'bz:is-fav-expend',
    false
  )

  return (
    <section className="flex w-full flex-col mt-3">
      <Button
        variant="ghost"
        size="icon"
        className="w-full h-5"
        onClick={() => setIsExpend(isExpend ? false : true)}>
        {isExpend ? (
          <ChevronsUp className="w-5 h-5 stroke-muted-foreground/30" />
        ) : (
          <ChevronsDown className="w-5 h-5 stroke-muted-foreground/30" />
        )}
      </Button>
    </section>
  )
}
