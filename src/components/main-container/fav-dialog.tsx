import * as z from 'zod'
import browser from 'webextension-polyfill'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { nanoid } from 'nanoid'
import { FavItem, useFavStore } from '@/store'
import { isDulplicateFavItem } from '@/lib/handle-fav-item'

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
  id: z.string(),
  label: z.string().min(2),
  url: z.string().url(),
  logoUrl: z.optional(z.string()),
  shortKey: z.optional(z.string()),
  searchField: z.optional(z.string()),
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
    id: nanoid(),
    label: '',
    url: '',
    logoUrl: '',
    shortKey: '',
    searchField: '',
  }

  const addFav = useFavStore((state) => state.addFav)
  const modifyFav = useFavStore((state) => state.modifyFav)

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
    if (isDulplicateFavItem(values)) return

    if (type === 'Add') addFav(values)
    else if (type === 'Modify') modifyFav({ ...itemInfo, ...values })
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'Modify'
              ? browser.i18n.getMessage('fav_dialog_title_modify')
              : browser.i18n.getMessage('fav_dialog_title_add')}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    {browser.i18n.getMessage('fav_dialog_form_label')}{' '}
                    <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Google"
                      className="bg-muted"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    {browser.i18n.getMessage('fav_dialog_form_URL')}{' '}
                    <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://google.com"
                      className="bg-muted"
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
                  <FormLabel className="text-muted-foreground">
                    {browser.i18n.getMessage('fav_dialog_form_Logo_URL')}
                  </FormLabel>
                  <Input
                    placeholder="https://google.com/favicon.ico"
                    className="bg-muted"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    {browser.i18n.getMessage('fav_dialog_form_short_key')}
                  </FormLabel>
                  <Input placeholder="google" className="bg-muted" {...field} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="searchField"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    {browser.i18n.getMessage('fav_dialog_form_search_field')}
                  </FormLabel>
                  <Input
                    placeholder="search?q="
                    className="bg-muted"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <div className="mb-3" />

            <Button type="submit" className="w-full bg-primary/80">
              {browser.i18n.getMessage('fav_dialog_form_confirm')}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
