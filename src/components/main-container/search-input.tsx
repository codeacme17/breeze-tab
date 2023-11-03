import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { BaiduIcon, BingIcon, GoogleIcon } from '@/components/icons'

export const SearchInput = () => {
  return (
    <section className="w-[620px] relative">
      <label
        className="absolute left-0 top-0 z-10 flex justify-center items-center h-full w-14"
        htmlFor="search-input">
        <Search className="stroke-primary/70" />
      </label>

      <input
        id="search-input"
        type="text"
        className={cn(` 
            w-full 
            h-12 
            pl-14
            pr-32 
            text-base 
            font-light
            outline-none 
            rounded-3xl 
            ease-in-out 
            duration-200 
            shadow-inner 
            border-[1px]
            dark:border-primary/40
            dark:bg-primary/5
            placeholder:text-primary/30 
            placeholder:text-sm 
            placeholder:select-none 
            focus:rounded-md 
            `)}
        placeholder="SEARCH YOU WANT"
      />

      <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center ease-in-out duration-300 transition-[fill,opacity]">
        <BingIcon classname="fill-primary/60 mr-2" />
        <GoogleIcon classname="fill-primary/60 mr-2" />
        <BaiduIcon classname="fill-primary/60" />
      </div>
    </section>
  )
}
