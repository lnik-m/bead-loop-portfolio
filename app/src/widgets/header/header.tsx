import { LogoSvg } from 'shared/assets'

import { useTheme } from 'features/theme'
import { Flex } from 'shared/ui'
import { Navbar } from './navbar'
import { UserMenu } from './user-menu'
import { ThemeToggle } from './theme-toggle'
import { LangToggle } from './lang-toggle'

interface Props {
  className: string
}

export const Header = ({ className }: Props) => {
  const { theme } = useTheme()
  return (
    <Flex className={`${className} w-full justify-between items-center`}>
      <Flex className="items-center gap-[0px]">
        <LogoSvg className="max-h-[42px]" isLight={theme === 'dark'} />
        <Navbar />
      </Flex>

      <Flex className="items-center gap-[0px] dark:opacity-70">
        <Flex className="items-center gap-x-[8px] mr-[12px]">
          <ThemeToggle />
          <LangToggle />
        </Flex>
        <UserMenu />
      </Flex>
    </Flex>
  )
}
