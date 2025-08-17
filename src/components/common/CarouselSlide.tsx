import { cn } from '@/lib/utils'
import Image from 'next/image'

type SlideProps = {
  image: string
  title: string
  className?: string
}

export function CarouselSlide({ image, title, className }: SlideProps) {
  return (
    <div className={cn(
      "relative flex w-full h-screen items-center justify-center",
      className
    )}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center"
        priority
      />
    </div>
  )
}