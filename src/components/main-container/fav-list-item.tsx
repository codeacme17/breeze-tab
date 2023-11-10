import { cn } from '@/lib/utils'
import { FavItem } from '@/store'

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
    <div key={item.id}>
      <ContextMenuTrigger
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
          <ContextMenuItem onClick={() => onModify(item)}>
            <Pencil className="w-4 h-4 mr-2" /> Modify
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onRemove(item)}>
            <Trash2 className="w-4 h-4 mr-2" /> Remove
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuTrigger>
    </div>
  )
}

const DragIcon = ({ isDragging }: DragIconProps) => {
  return (
    <div
      className={cn(
        'absolute right-2 top-2 transition-opacity opacity-0'
      )}>
      <GripHorizontal className="stroke-muted-foreground" />
    </div>
  )
}
