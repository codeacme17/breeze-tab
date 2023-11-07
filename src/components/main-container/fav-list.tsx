import { useState } from 'react'
import { FavItem, useFavListStore } from '@/store'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const items = Array.from(favList)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFavList(items)
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favList" direction="horizontal">
          {(provided) => (
            <section
              className="w-full flex mt-5"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {favList!.map((item, index) => (
                <Draggable key={item.url} draggableId={item.url} index={index}>
                  {(provided) => (
                    <ContextMenu>
                      <ContextMenuTrigger
                        className="
                          h-32 
                          w-1/5 
                        ">
                        <div
                          onClick={() => window.location.assign(item.url)}
                          className="
                          h-full
                          w-full 
                          flex 
                          flex-col 
                          select-none 
                          justify-center 
                          items-center 
                          hover:bg-muted 
                          transition-colors 
                          delay-75 
                          rounded-lg 
                          cursor-pointer"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
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
                      </ContextMenuTrigger>
                      <ContextMenuContent className="bg-background">
                        <ContextMenuItem onClick={() => handleModify(item)}>
                          <Pencil className="w-4 h-4 mr-2" /> Modify
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => handleRemove(item)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  )}
                </Draggable>
              ))}

              <div
                onClick={handleAdd}
                className={`
                  h-32 
                  w-1/5 
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
                `}>
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-muted-foreground/20">
                  <Plus className="w-6 h-6 stroke-muted-foreground" />
                </div>

                <p className="text-sm mt-2 text-muted-foreground/70">Add New</p>
              </div>
            </section>
          )}
        </Droppable>
      </DragDropContext>

      <FavDialog
        type={currentItem ? 'Modify' : 'Add'}
        open={showDialog}
        onOpenChange={setShowDialog}
        itemInfo={currentItem}
      />
    </>
  )
}
