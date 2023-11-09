import browser from 'webextension-polyfill'
import { useFavListStore } from '@/store'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Popup = () => {
  const favList = useFavListStore((state) => state.favList)

  console.log(favList)

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    console.log(tabs)
    console.log(tabs[0].url)
  })

  return (
    <section className="flex flex-col justify-center text-foreground w-60 px-2 py-4">
      <div className="flex items-center mb-3">
        <img src="/logo.png" alt="" className="w-5 h-5" />
        <div className="ml-2 text-sm">Breeze Tab</div>
      </div>

      <Label className="text-muted-foreground mb-1">Short Key</Label>
      <Input className="h-8" placeholder="google" />

      <Button className="w-full mt-3" variant="outline">
        Add current page to fav
      </Button>
    </section>
  )
}

export default Popup
