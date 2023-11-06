import { useState } from 'react'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { FavDialog } from './fav-dialog'

export type FavItem = {
  label: string
  url: string
  logoUrl?: string
  shortKey?: string
  searchField?: string
}

export const FavList = () => {
  const favList: FavItem[] = [
    {
      label: 'Github',
      url: 'https://github.com',
      logoUrl: 'https://github.githubassets.com/favicons/favicon-dark.png',
      shortKey: 'github',
      searchField: '',
    },
  ]

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

  return (
    <section className="w-full flex flex-wrap mt-2">
      {favList.map((item) => (
        <ContextMenu key={item.url}>
          <ContextMenuTrigger
            className="
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
            ">
            <div onClick={() => window.location.assign(item.url)}>
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-muted-foreground/20">
                <img src={item.logoUrl} className="w-6 h-6" />
              </div>

              <p className="text-sm mt-2 text-muted-foreground/70">
                {item.label}
              </p>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => handleModify(item)}>
              <Pencil className="w-4 h-4 mr-2" /> Modify
            </ContextMenuItem>
            <ContextMenuItem>
              <Trash2 className="w-4 h-4 mr-2" /> Remove
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
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

      <FavDialog
        type={currentItem ? 'Modify' : 'Add'}
        open={showDialog}
        onOpenChange={setShowDialog}
        itemInfo={currentItem}
      />
    </section>
  )
}
