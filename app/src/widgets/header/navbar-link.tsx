import type { PropsWithChildren, ReactNode } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router'
import { Flex } from 'shared/ui'

interface Props {
  route: string
  icon?: ReactNode
}

export const NavbarLink = ({
  route,
  icon,
  children
}: PropsWithChildren<Props>) => {
  const { pathname } = useLocation()
  return (
    <Link
      to={route}
      className={`${
        pathname.includes(route) ? 'opacity-100 font-medium' : 'opacity-70'
      }`}
    >
      <Flex nowrap className="gap-x-1 items-center">
        {icon}
        {children}
      </Flex>
    </Link>
  )
}
