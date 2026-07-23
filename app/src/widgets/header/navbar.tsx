import { type ReactNode, useMemo } from 'react'
import { routes } from 'app/routes'
import { useI18n } from 'features/i18n'
import { Flex } from 'shared/ui'
import { NavbarLink } from './navbar-link'

type NavbarItem = {
  route: string
  text: string
  icon?: ReactNode
}

interface Props {
  className?: string
}

export const Navbar = ({ className }: Props) => {
  const { localize } = useI18n()

  const navbarItems: NavbarItem[] = useMemo(() => {
    return [
      {
        route: routes.myTemplates,
        text: localize('dashboard.navbar.myTemplates')
      },
      {
        route: routes.myProjects,
        text: localize('dashboard.navbar.myProjects')
      }
    ]
  }, [localize])

  return (
    <Flex className={`gap-x-5 ${className}`}>
      {navbarItems.map(({ route, text, icon }, i) => (
        <NavbarLink key={`${route}-${i}`} route={route} icon={icon}>
          {text}
        </NavbarLink>
      ))}
    </Flex>
  )
}
