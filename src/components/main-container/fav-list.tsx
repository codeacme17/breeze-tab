import browser from 'webextension-polyfill'
import { useState } from 'react'
import { FavItem, useFavStore } from '@/store'
import { cn } from '@/lib/utils'

import { ReactSortable } from 'react-sortablejs'
import { ContextMenu } from '@/components/ui/context-menu'
import { Plus } from 'lucide-react'
import { FavDialog } from './fav-dialog'
import { FavListItem } from './fav-list-item'

export const FavList = () => {
  const favList = useFavStore((state) => state.favList)
  const setFavList = useFavStore((state) => state.setFavList)
  const removeFav = useFavStore((state) => state.removeFav)

  const [isDragging, setIsDragging] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [currentRightClickItem, setCurrentRightClickItem] =
    useState<FavItem | null>(null)

  const [currentDraggingIndex, setCurrentDraggingIndex] = useState<
    number | null
  >(null)

  const handleStartDragging = (e: any) => {
    setCurrentDraggingIndex(e.oldIndex)
    setIsDragging(true)
  }

  const handleEndDragging = () => {
    setCurrentDraggingIndex(null)
    setIsDragging(false)
  }

  const handleModify = (item: FavItem) => {
    setShowDialog(true)
    setCurrentRightClickItem(item)
  }

  const handleAdd = () => {
    setShowDialog(true)
    setCurrentRightClickItem(null)
  }

  const handleRemove = (item: FavItem) => {
    removeFav(item)
  }

  return (
    <section className="h-[400px] w-full overflow-y-scroll mt-5 scroll-smooth">
      <ReactSortable
        list={favList}
        setList={setFavList}
        handle=".handle"
        ghostClass="ghost"
        animation={300}
        scrollSensitivity={100}
        forceFallback={true}
        scrollSpeed={20}
        onStart={handleStartDragging}
        onEnd={handleEndDragging}
        className="grid grid-cols-5">
        {favList.map((item, index) => (
          <ContextMenu key={item!.url}>
            <FavListItem
              item={item}
              isDragging={isDragging}
              onModify={handleModify}
              onRemove={handleRemove}
              currentDraggingIndex={currentDraggingIndex}
              index={index}
            />
          </ContextMenu>
        ))}

        <div
          onClick={handleAdd}
          className={cn(
            `
            ghost
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
            `,
            isDragging ? '' : 'hover:bg-muted/70'
          )}>
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-muted-foreground/20">
            <Plus className="w-6 h-6 stroke-muted-foreground" />
          </div>

          <p className="text-sm mt-2 text-muted-foreground/70">
            {browser.i18n.getMessage('fav_add')}
          </p>
        </div>
      </ReactSortable>

      <FavDialog
        type={currentRightClickItem ? 'Modify' : 'Add'}
        open={showDialog}
        onOpenChange={setShowDialog}
        itemInfo={currentRightClickItem}
      />
    </section>
  )
}
