import browser from 'webextension-polyfill'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { FavItem, useFavListStore } from '@/store'
import {
  handleFavItem,
  isDulplicateFavItem,
} from '@/lib/handle-fav-item'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

const Popup = () => {
  const addFav = useFavListStore((state) => state.addFav)
  const [currentPageInfo, setCurrentPageInfo] =
    useState<browser.Tabs.Tab | null>(null)
  const [isValidUrl, setIsValidUrl] = useState(false)

  const getCurrentPageInfo = () => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        setIsValidUrl(
          tabs[0].url?.startsWith('http') ||
            tabs[0].url?.startsWith('https') ||
            false
        )

        setCurrentPageInfo(tabs[0])
      })
  }

  useEffect(() => {
    getCurrentPageInfo()
  }, [])

  if (!isValidUrl)
    return (
      <section className="w-60 text-center">
        Current page is not a valid page
      </section>
    )

  const handleAdd = () => {
    if (!currentPageInfo || !currentPageInfo.url) return

    const data: FavItem = {
      id: nanoid(),
      label: currentPageInfo.title as string,
      url: currentPageInfo?.url,
      logoUrl: currentPageInfo?.favIconUrl as string,
      canvasLogoUrl: '',
    }

    if (isDulplicateFavItem(data!)) return

    addFav(handleFavItem(data))

    toast({
      title: 'Success',
      description: 'Successfully added to fav list.',
    })

    setTimeout(() => {
      window.close()
    }, 2000)
  }

  return (
    <section className="flex flex-col justify-center text-foreground w-96 px-2 py-4">
      <div className="flex items-center mb-3">
        <img src="/logo.png" alt="" className="w-5 h-5" />
        <div className="ml-2 text-sm">Breeze Tab</div>
      </div>

      <Label className="text-muted-foreground mb-1">Label</Label>
      <Input
        className="h-8 mb-4"
        placeholder="Google"
        value={currentPageInfo?.title as string}
      />

      <Label className="text-muted-foreground mb-1">Short Key</Label>
      <Input className="h-8" placeholder="g" />

      <Button
        className="w-full mt-3"
        variant="outline"
        onClick={handleAdd}>
        Add current page to fav
      </Button>
    </section>
  )
}

export default Popup
