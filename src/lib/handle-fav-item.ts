import { toast } from '@/components/ui/use-toast'
import { FavItem, useFavListStore } from '@/store'

export const handleFavItem = (favItem: FavItem) => {
  favItem = createCanvaseLogo(favItem)
  return favItem
}

// Create an auto-generated icon by canvas,
// insert the url to the state
const createCanvaseLogo = (favItem: FavItem) => {
  const canvas = drawReserveLogo(favItem)
  const canvasURL = canvas.toDataURL('image/webp')
  favItem.canvasLogoUrl = canvasURL
  return favItem
}

// Draw an auto-generated icon
const drawReserveLogo = (favItem: FavItem) => {
  const canvas = document.createElement('canvas')
  canvas.width = 28
  canvas.height = 28

  const bgCtx =
    canvas.getContext('2d') || new CanvasRenderingContext2D()
  bgCtx.arc(
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2,
    0,
    2 * Math.PI
  )
  bgCtx.fillStyle = `hsl(${Math.random() * 1000}, 70%, 50%)`
  bgCtx.fill()

  const textCtx =
    canvas.getContext('2d') || new CanvasRenderingContext2D()
  textCtx.shadowColor = 'rgba(0, 0, 0, 0.2)'
  textCtx.shadowOffsetX = 2
  textCtx.shadowOffsetY = 2
  textCtx.font = 'bold 17px Poppins'
  textCtx.fillStyle = 'white'
  textCtx.textAlign = 'center'
  textCtx.textBaseline = 'middle'
  textCtx.fillText(
    favItem.label.substr(0, 1).toUpperCase(),
    canvas.width / 2,
    canvas.height / 2 + canvas.height / 16
  )
  return canvas
}

export const isDulplicateFavItem = (favItem: FavItem) => {
  const favList = useFavListStore.getState().favList
  const is = favList.find(
    (item) =>
      (item.url === favItem.url || item.label === favItem.label) &&
      item.id !== favItem.id
  )

  if (is)
    toast({
      title: 'Duplicate Item',
      description: 'This item already exists.',
      variant: 'destructive',
    })

  return is
}
