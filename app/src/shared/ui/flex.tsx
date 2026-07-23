import type { PropsWithChildren } from 'react'

interface Props {
  className?: string
  column?: boolean
  nowrap?: boolean
  isGap?: boolean
}

export const Flex = ({
  className,
  column,
  nowrap,
  isGap,
  children
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={`${className} flex ${!isGap && 'gap-[8px]'}
        ${column && 'flex-col'} 
        ${nowrap && 'flex-nowrap'}
      `}
    >
      {children}
    </div>
  )
}
