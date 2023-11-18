import { cn } from '@/lib/utils'

export const BingIcon = ({
  className,
  onClick,
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
      onClick={onClick}
      className={(cn('ease-in-out duration-200 -mr-0.5'), className)}>
      <path d="M5,3V19L8.72,21L18,15.82V11.73H18L9.77,8.95L11.38,12.84L13.94,14L8.7,16.92V4.27L5,3" />
    </svg>
  )
}
