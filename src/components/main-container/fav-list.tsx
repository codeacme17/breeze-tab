import { useCallback, useState } from 'react'
import { FavItem, useFavListStore } from '@/store'
import { cn } from '@/lib/utils'

import { ReactSortable } from 'react-sortablejs'
import { ContextMenu } from '@/components/ui/context-menu'
import { Plus } from 'lucide-react'
import { FavDialog } from './fav-dialog'
import { FavListItem } from './fav-list-item'

export const FavList = () => {
  const favList = useFavListStore((state) => state.favList)
  const setFavList = useFavListStore((state) => state.setFavList)
  const removeFav = useFavListStore((state) => state.removeFav)

  const [showDialog, setShowDialog] = useState(false)
  const [currentItem, setCurrentItem] = useState<FavItem | null>(null)

  const handleModify = (item: FavItem) => {
    setShowDialog(true)
    setCurrentItem(item)
  }

  const handleAdd = () => {
    setShowDialog(true)
    setCurrentItem(null)
  }

  const handleRemove = (item: FavItem) => {
    removeFav(item)
  }

  return (
    <section className="h-[370px] w-full overflow-y-scroll mt-5">
      <ReactSortable
        list={favList}
        setList={setFavList}
        handle=".handle"
        ghostClass="ghost"
        animation={300}
        scrollSensitivity={100}
        forceFallback={true}
        scrollSpeed={10}
        className="grid grid-cols-5">
        {favList.map((item) => (
          <ContextMenu key={item!.url}>
            <FavListItem
              item={item}
              onModify={handleModify}
              onRemove={handleRemove}
            />
          </ContextMenu>
        ))}

        <div
          onClick={handleAdd}
          className={cn(
            `   ghost
                h-32 
                flex 
                flex-col 
                select-none 
                justify-center 
                items-center 
                transition-colors 
                delay-75 
                rounded-lg 
                cursor-pointer
                `
          )}>
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-muted-foreground/20">
            <Plus className="w-6 h-6 stroke-muted-foreground" />
          </div>

          <p className="text-sm mt-2 text-muted-foreground/70">
            Add New
          </p>
        </div>
      </ReactSortable>

      <FavDialog
        type={currentItem ? 'Modify' : 'Add'}
        open={showDialog}
        onOpenChange={setShowDialog}
        itemInfo={currentItem}
      />
    </section>
  )
}
