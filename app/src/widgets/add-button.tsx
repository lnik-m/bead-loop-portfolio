import { IconCirclePlusFilled } from '@tabler/icons-react'

import { Link } from 'react-router'

interface Props {
  to: string
  label: string
}

export const AddButton = ({ to, label }: Props) => {
  return (
    <Link
      to={to}
      className="
      group
      flex flex-col items-center justify-center gap-1
      w-[268px] h-[208px]
      rounded-md border-[4px]
      bg-support-50 dark:bg-beadLoop-gray
      border-beadLoop-light50 dark:border-beadLoop-gray20
     "
    >
      <IconCirclePlusFilled
        size={54}
        className="text-beadLoop-blueLight dark:text-beadLoop-blueLight
        opacity-70 group-hover:opacity-100"
      />
      <p
        className="opacity-50 group-hover:opacity-70
      text-beadLoop-black dark:text-beadLoop-blueLight
      group-hover:text-beadLoop-black dark:group-hover:text-beadLoop-blueLight"
      >
        {label}
      </p>
    </Link>
  )
}
