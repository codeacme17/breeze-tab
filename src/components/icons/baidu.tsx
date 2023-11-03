import { cn } from '@/lib/utils'

export const BaiduIcon = ({
  classname,
  onClick,
}: {
  classname: string | undefined
  onClick: () => void
}) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      width="24"
      height="24"
      onClick={onClick}
      className={cn('ease-in-out duration-200', classname)}>
      <path
        d="M265.258667 532.736c83.797333-18.005333 72.234667-118.272 69.845333-140.245333-4.096-33.621333-43.861333-92.672-97.749333-87.936-67.754667 6.016-77.696 104.106667-77.696 104.106666-9.216 45.226667 21.973333 142.08 105.6 124.074667m155.562666-168.277333c46.250667 0 83.584-53.376 83.584-119.125334 0-65.578667-37.162667-118.826667-83.413333-118.826666-46.336 0-83.882667 52.992-83.882667 118.826666s37.546667 119.125333 83.84 119.125334m199.296 7.936c62.037333 8.32 101.546667-57.813333 109.568-107.946667 8.021333-49.749333-32.170667-107.861333-75.776-117.888-43.989333-10.112-98.261333 60.202667-103.722666 105.984-5.802667 56.234667 8.021333 112.085333 69.717333 120.021333m245.376 84.181334c0-23.978667-19.626667-96.128-93.44-96.128-73.770667 0-83.84 68.096-83.84 116.309333 0 45.952 3.797333 109.781333 95.872 107.861333 91.648-2.218667 81.621333-104.021333 81.621333-128.085333M772.266667 666.709333s-95.872-74.197333-151.765334-154.154666c-75.776-118.101333-183.637333-69.973333-219.477333-10.197334-36.053333 60.501333-91.861333 98.389333-99.797333 108.544-8.021333 9.898667-115.584 68.096-91.605334 174.037334 24.021333 105.941333 107.861333 104.064 107.861334 104.064s61.696 6.058667 133.674666-9.984c71.936-16 133.546667 3.882667 133.546667 3.882666s167.253333 56.192 213.546667-51.712c45.738667-108.245333-26.026667-164.138667-26.026667-164.138666"
        p-id="3554"></path>
    </svg>
  )
}
