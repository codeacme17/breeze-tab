import { useCallback, useState } from 'react'
import { FavItem, useFavListStore } from '@/store'

import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { FavDialog } from './fav-dialog'

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

  const onDragEnd = useCallback(
    (result: any) => {
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

  const reorder = (
    list: FavItem[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = list
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppableFavList"
        direction="horizontal"
        isCombineEnabled={true}>
        {(provided, snapshot) => (
          <section
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full grid grid-cols-5 mt-5">
            {favList.map((item, index) => (
              <ContextMenu key={item!.url}>
                <Draggable
                  key={item.url}
                  draggableId={item.url}
                  index={index}>
                  {(provided, snapshot) => (
                    <ContextMenuTrigger
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="
                        h-32 
                        flex 
                        flex-col 
                        select-none 
                        justify-center 
                        items-center 
                        hover:bg-muted 
                        transition-colors 
                        delay-75 
                        rounded-lg 
                        cursor-pointer
                      ">
                      <div
                        {...provided.dragHandleProps}
                        onClick={() =>
                          window.location.assign(item.url)
                        }>
                        <div className="w-12 mx-auto h-12 rounded-full flex justify-center items-center bg-muted-foreground/20">
                          <img
                            src={item.logoUrl}
                            onError={(e: any) =>
                              (e.target.src = item.canvasLogoUrl)
                            }
                            className="w-6 h-6"
                          />
                        </div>

                        <p className="text-sm truncate w-24 text-center break-words mt-2 text-muted-foreground/70">
                          {item.label}
                        </p>
                      </div>

                      <ContextMenuContent className="bg-background">
                        <ContextMenuItem
                          onClick={() => handleModify(item)}>
                          <Pencil className="w-4 h-4 mr-2" /> Modify
                        </ContextMenuItem>
                        <ContextMenuItem
                          onClick={() => handleRemove(item)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenuTrigger>
                  )}
                </Draggable>
              </ContextMenu>
            ))}
            {provided.placeholder}

            <div
              onClick={handleAdd}
              className="
                h-32 
                flex 
                flex-col 
                select-none 
                justify-center 
                items-center 
                hover:bg-muted 
                transition-colors 
                delay-75 
                rounded-lg 
                cursor-pointer
                ">
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-muted-foreground/20">
                <Plus className="w-6 h-6 stroke-muted-foreground" />
              </div>

              <p className="text-sm mt-2 text-muted-foreground/70">
                Add New
              </p>
            </div>
          </section>
        )}
      </Droppable>
      {/* Other components remain the same */}

      <FavDialog
        type={currentItem ? 'Modify' : 'Add'}
        open={showDialog}
        onOpenChange={setShowDialog}
        itemInfo={currentItem}
      />
    </DragDropContext>
  )
}
