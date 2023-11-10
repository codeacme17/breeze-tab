import { useCallback, useState } from 'react'
import { FavItem, useFavListStore } from '@/store'
import { cn } from '@/lib/utils'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
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
  const [isDragging, setIsDragging] = useState(false)

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

  const onDragStart = () => {
    setIsDragging(true)
  }

  const onDragEnd = useCallback(
    (result: any) => {
      setIsDragging(false)

      if (!result.destination) return

      const newFavList = reorder(
        favList,
        result.source.index,
        result.destination.index
      )

      setFavList(newFavList)
    },
    [favList, setFavList]
  )

  const reorder = (list: FavItem[], startIndex: number, endIndex: number) => {
    const result = list
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="droppableFavList" direction="horizontal">
        {(provided) => (
          <section
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full grid grid-cols-5 mt-5">
            {favList.map((item, index) => (
              <ContextMenu key={item!.url}>
                <FavListItem
                  item={item}
                  index={index}
                  onModify={handleModify}
                  onRemove={handleRemove}
                  isDragging={isDragging}
                />
              </ContextMenu>
            ))}

            {provided.placeholder}

            <div
              onClick={handleAdd}
              className={cn(
                `
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
                isDragging ? '' : 'hover:bg-muted'
              )}>
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-muted-foreground/20">
                <Plus className="w-6 h-6 stroke-muted-foreground" />
              </div>

              <p className="text-sm mt-2 text-muted-foreground/70">Add New</p>
            </div>
          </section>
        )}
      </Droppable>

      <FavDialog
        type={currentItem ? 'Modify' : 'Add'}
        open={showDialog}
        onOpenChange={setShowDialog}
        itemInfo={currentItem}
      />
    </DragDropContext>
  )
}
