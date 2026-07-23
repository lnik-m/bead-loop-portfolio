import type { MouseEventHandler, PropsWithChildren } from 'react'
import { Tooltip } from '@mantine/core'

interface Props extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  label?: string
  isActive?: boolean
  disabled?: boolean
}

export const ActionIcon = ({
  onClick,
  className,
  label,
  isActive,
  disabled,
  children
}: Props) => {
  const renderButton = () => {
    return (
      <button
        className={`flex items-center justify-center
            ${
              isActive
                ? 'bg-bead-loop-lilac hover:bg-bead-loop-lilac-05 text-support-50'
                : 'bg-support-50 text-secondary-800'
            } 
            active:translate-y-0.5
            p-0.5 w-[34px] h-[34px] rounded ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }

  return (
    <>
      {label ? (
        <Tooltip label={label}>{renderButton()}</Tooltip>
      ) : (
        renderButton()
      )}
    </>
  )
}
