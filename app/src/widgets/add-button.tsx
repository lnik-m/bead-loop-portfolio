import { IconCirclePlusFilled } from '@tabler/icons-react'

import { Link } from 'react-router'

interface Props {
  to: string
  label: string
  state?: unknown
}

export const AddButton = ({ to, label, state }: Props) => {
  return (
    <Link
      to={to}
      state={state}
      className="
      group
      flex flex-col items-center justify-center gap-1
      w-[268px] h-[208px]
      rounded-md border-[4px]
      bg-support-50 dark:bg-bead-loop-gray
      border-bead-loop-light-50 dark:border-bead-loop-gray-20
     "
    >
      <IconCirclePlusFilled
        size={54}
        className="text-bead-loop-blue-light dark:text-bead-loop-blue-light
        opacity-70 group-hover:opacity-100"
      />
      <p
        className="opacity-50 group-hover:opacity-70
      text-bead-loop-black dark:text-bead-loop-blue-light
      group-hover:text-bead-loop-black dark:group-hover:text-bead-loop-blue-light"
      >
        {label}
      </p>
    </Link>
  )
}
