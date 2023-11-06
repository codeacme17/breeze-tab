import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FavItem } from './fav-list'
import { useState } from 'react'

export const FavDialog = ({
  type,
  open,
  onOpenChange,
  itemInfo,
}: {
  type: 'Add' | 'Modify'
  open: boolean
  onOpenChange: (open: boolean) => void
  itemInfo?: FavItem | null
}) => {
  const [info, setInfo] = useState<FavItem>(itemInfo!)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type} Item</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete
            your account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
