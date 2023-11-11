import Browser from 'webextension-polyfill'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { FavItem, useFavListStore } from '@/store'
import { handleFavItem, isDulplicateFavItem } from '@/lib/handle-fav-item'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Construction } from 'lucide-react'

const Popup = () => {
  const addFav = useFavListStore((state) => state.addFav)

  const [currentPageInfo, setCurrentPageInfo] = useState<Browser.Tabs.Tab>()
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [label, setLabel] = useState('')
  const [shortKey, setShortKey] = useState('')

  useEffect(() => {
    const getCurrentPageInfo = async () => {
      const tabs = await Browser.tabs.query({
        active: true,
        currentWindow: true,
      })

      setIsValidUrl(
        tabs[0]?.url?.startsWith('http') ||
          tabs[0]?.url?.startsWith('https') ||
          false
      )
      setCurrentPageInfo(tabs[0])
      setLabel(tabs[0]?.title || '')
    }

    getCurrentPageInfo()
  }, [])

  if (!isValidUrl) return <ErroHint />

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!currentPageInfo || !currentPageInfo.url) return

    const data: FavItem = {
      id: nanoid(),
      label: label,
      url: currentPageInfo.url,
      logoUrl: currentPageInfo.favIconUrl as string,
      shortKey: shortKey,
      canvasLogoUrl: '',
    }

    if (isDulplicateFavItem(data)) return

    addFav(handleFavItem(data))

    setLabel('')
    setShortKey('')
    window.close()
  }

  return (
    <section className="flex flex-col justify-center text-foreground w-96 p-3">
      <h2 className="text-lg flex items-center select-none">
        <img src="/logo.png" className="w-6 h-6 mr-2" />
        {Browser.i18n.getMessage('popup_add_current')}
      </h2>

      <form onSubmit={handleAdd} className="mt-3">
        <Label>
          {Browser.i18n.getMessage('fav_dialog_form_label')}{' '}
          <span className="text-primary">*</span>
        </Label>
        <Input
          className="h-9 mb-4 mt-1"
          placeholder="Google"
          value={label}
          onChange={({ target }) => {
            setLabel(target.value)
          }}
        />

        <Label>{Browser.i18n.getMessage('fav_dialog_form_short_key')}</Label>
        <Input
          className="h-9 mt-1"
          placeholder="g"
          value={shortKey}
          onChange={({ target }) => {
            setShortKey(target.value)
          }}
        />
        <Button
          className="w-full mt-3"
          variant="secondary"
          disabled={!label.trim()}
          type="submit">
          {Browser.i18n.getMessage('fav_dialog_form_confirm')}
        </Button>
      </form>
    </section>
  )
}

const ErroHint = () => {
  return (
    <section className="w-60 text-center h-28 flex flex-col justify-center items-center select-none">
      <Construction className="mb-1" />
      <p>Oops...</p>
      <p>{Browser.i18n.getMessage('hint_invalid_page')}</p>
    </section>
  )
}

export default Popup
