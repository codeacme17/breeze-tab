import { Button } from '@/components/ui/button'
import { version } from '../../package.json'
import { Github } from 'lucide-react'

import { useFavListStore } from '@/store'

const Popup = () => {
  const favList = useFavListStore((state) => state.favList)

  console.log(favList)

  return (
    <>
      <div className="flex w-full">
        <Button
          size="icon"
          className="mr-auto ml-2 mt-2"
          variant="ghost"
          onClick={() =>
            window.open('https://github.com/codeacme17/breeze-tab')
          }>
          <Github className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center text-foreground w-80 h-52 -mt-10">
        <div className="w-24 h-24 relative">
          <img
            src="/logo.png"
            alt="Breeze Tab Logo"
            className="w-24 absolute z-10"
          />
          <img
            src="/logo.png"
            alt="Breeze Tab Logo"
            className="w-24 blur-lg absolute"
          />
        </div>
        <h2 className="text-2xl">Breeze Tab</h2>
        <p className="text-sm mt-1">
          <code className="ml-1 px-2 py-0.5 bg-secondary-foreground/30 rounded-lg">
            v{version}
          </code>
        </p>
      </div>
    </>
  )
}
export default Popup
