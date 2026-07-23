import { IconLoader2 } from '@tabler/icons-react'

import type { MouseEventHandler, PropsWithChildren } from 'react'
import { Flex } from 'shared/ui'

interface Props extends PropsWithChildren {
  className?: string
  theme?: 'accent' | 'dark' | 'warn'
  tooltip?: string
  loading?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  otherProps?: Record<string, unknown>
}

export const Button = ({
  className,
  theme = 'accent',
  tooltip,
  loading,
  disabled,
  onClick,
  otherProps,
  children
}: Props) => {
  let colors
  switch (theme) {
    case 'dark':
      colors =
        'bg-secondary-900 hover:bg-secondary-950 disabled:bg-secondary-700'
      break
    case 'warn':
      colors = 'bg-support-300 hover:bg-support-400 disabled:bg-support-200'
      break
    default:
      colors =
        'bg-bead-loop-lilac-05 hover:bg-bead-loop-lilac disabled:bg-bead-loop-lilac-05'
  }
  return (
    <>
      <button
        className={`flex justify-center items-center gap-1 flex-nowrap
         text-bold text-bead-loop-light-05 ${colors}
         p-2 rounded
         active:translate-y-0.5 group/tooltip
         disabled:cursor-not-allowed
         disabled:translate-y-0
         ${className}`}
        disabled={loading || disabled}
        onClick={onClick}
        {...otherProps}
      >
        {loading && <IconLoader2 size={18} className="animate-spin mr-1" />}
        {tooltip && (
          <Flex
            column
            className="opacity-0 group-hover/tooltip:opacity-100 absolute top-[-40px] bg-secondary-950
            px-2 py-1 rounded z-[110] items-center"
          >
            {tooltip}
            <div className="absolute bg-secondary-950 h-2 w-2 rotate-45 bottom-[-4px]"></div>
          </Flex>
        )}
        {children}
      </button>
    </>
  )
}
