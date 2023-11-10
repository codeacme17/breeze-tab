import { cn } from '@/lib/utils'
import { FavItem } from '@/store'

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Pencil, Trash2, GripHorizontal } from 'lucide-react'

interface FavListItemProps {
  item: FavItem
  onModify: (item: FavItem) => void
  onRemove: (item: FavItem) => void
  isDragging: boolean
  currentDraggingIndex: number | null
  index: number
}

export const FavListItem = ({
  item,
  onModify,
  onRemove,
  isDragging,
  currentDraggingIndex,
  index,
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
          `,
          isDragging ? 'cursor-grabbing' : 'hover:bg-muted/70 cursor-pointer',
          currentDraggingIndex === index ? 'shadow-lg bg-muted/70' : ''
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
              bg-muted-foreground/20
            ">
            <img
              src={item.logoUrl}
              onError={(e: any) => (e.target.src = item.canvasLogoUrl)}
              className="w-6 h-6"
            />
          </div>

          <div
            className={cn(
              'handle absolute right-2 top-2 transition-opacity opacity-0 ',
              isDragging
                ? 'opacity-0 cursor-grabbing'
                : 'group-hover:opacity-100 cursor-grab'
            )}>
            <GripHorizontal className="stroke-muted-foreground" />
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
