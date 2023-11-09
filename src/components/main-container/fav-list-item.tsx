import { cn } from '@/lib/utils'

import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Pencil, Trash2, GripHorizontal } from 'lucide-react'
import { FavItem } from '@/store'

interface FavListItemProps {
  item: FavItem
  index: number
  onModify: (item: FavItem) => void
  onRemove: (item: FavItem) => void
  isDragging: boolean
}

interface DragIconProps {
  isDragging: boolean
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
}

export const FavListItem = ({
  item,
  index,
  onModify,
  onRemove,
  isDragging,
}: FavListItemProps) => {
  return (
    <Draggable key={item.url} draggableId={item.url} index={index}>
      {(provided, snapshot) => (
        <ContextMenuTrigger
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            `
            relative
            group
            h-32 
            flex 
            flex-col 
            select-none 
            justify-center 
            items-center 
            transition-[colors,shadow] 
            delay-75 
            shadow:duration-100
            rounded-lg 
            cursor-pointer
          `,
            snapshot.isDragging ? 'bg-muted shadow-lg' : '',
            isDragging ? 'hover:bg-none' : 'hover:bg-muted'
          )}>
          <div onClick={() => window.location.assign(item.url)}>
            <div
              className="
              w-12 
              h-12 
              mx-auto 
              rounded-full 
              flex 
              justify-center 
              items-center 
              bg-muted-foreground/20">
              <img
                src={item.logoUrl}
                onError={(e: any) => (e.target.src = item.canvasLogoUrl)}
                className="w-6 h-6"
              />
            </div>

            <p className="text-sm truncate w-24 text-center break-words mt-2 text-muted-foreground/70">
              {item.label}
            </p>
          </div>

          <DragIcon
            provided={provided}
            isDragging={isDragging}
            snapshot={snapshot}
          />

          <ContextMenuContent className="bg-background">
            <ContextMenuItem onClick={() => onModify(item)}>
              <Pencil className="w-4 h-4 mr-2" /> Modify
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onRemove(item)}>
              <Trash2 className="w-4 h-4 mr-2" /> Remove
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenuTrigger>
      )}
    </Draggable>
  )
}

const DragIcon = ({ isDragging, provided, snapshot }: DragIconProps) => {
  return (
    <div
      {...provided.dragHandleProps}
      className={cn(
        'absolute right-2 top-2 transition-opacity opacity-0',
        snapshot.isDragging && 'opacity-100',
        !isDragging && 'group-hover:opacity-100'
      )}>
      <GripHorizontal className="stroke-muted-foreground" />
    </div>
  )
}
