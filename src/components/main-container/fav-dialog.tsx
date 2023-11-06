import * as z from 'zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FavItem } from './fav-list'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  label: z.string().min(2),
  url: z.string().url(),
  logoUrl: z.optional(z.string().url()),
})

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
  const DEFAULT_ITEM: FavItem = {
    label: '',
    url: '',
    logoUrl: '',
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: itemInfo || DEFAULT_ITEM,
  })

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
    form.reset(DEFAULT_ITEM)
  }

  useEffect(() => {
    if (itemInfo && open) form.reset(itemInfo)
  }, [itemInfo, open])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type} Item</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Label <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Google" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    URL <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://google.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon URL</FormLabel>
                  <Input
                    placeholder="https://google.com/favicon.ico"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
