export const FavList = () => {
  return (
    <section className="w-full flex flex-wrap mt-2">
      <div
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
        <div className="w-14 h-14 rounded-full flex justify-center items-center bg-muted-foreground/20">
          <img
            src="https://github.githubassets.com/favicons/favicon-dark.png"
            className="w-6 h-6"
          />
        </div>

        <p className="text-sm mt-2 text-muted-foreground/70">
          Github
        </p>
      </div>
    </section>
  )
}
