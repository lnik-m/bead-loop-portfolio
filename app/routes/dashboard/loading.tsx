import { LogoSvg } from 'shared/assets'

import { useLocation } from 'react-router'
import { routes } from 'app/routes'
import { useTheme } from 'features/theme'
import { Flex } from 'shared/ui'

interface Props {
  hideHeader?: boolean
}

export const DashboardSkeleton = ({ hideHeader }: Props) => {
  const { theme } = useTheme()
  const { pathname } = useLocation()
  const fullScreenPage =
    pathname.includes(routes.editTemplate) || pathname.includes(routes.project)

  const cards = Array.from({ length: 7 }, (_, i) => i)

  const renderCards = () => {
    return (
      <Flex
        className={`min-h-[calc(100vh-100px)] gap-[20px]
          ${fullScreenPage ? 'max-h-[calc(100vh-100px)]' : ''}`}
      >
        <div className="max-w-full overflow-hidden dark:text-bead-loop-light-05 flex-grow p-3">
          <Flex column>
            <Flex className="max-w-full flex-wrap gap-3" isGap>
              {cards.map(card => (
                <Flex
                  key={card}
                  className="w-[268px] h-[208px] gap-0
                  rounded-md border-[4px]
                  animate-pulse
                bg-bead-loop-light-50 dark:bg-bead-loop-gray-20
                border-bead-loop-light-50 dark:border-bead-loop-gray-20"
                  isGap
                  column
                />
              ))}
            </Flex>
          </Flex>
        </div>
      </Flex>
    )
  }
  if (hideHeader) return renderCards()
  return (
    <div
      className={`h-screen px-[70px] 
        ${fullScreenPage ? 'overflow-hidden' : ''}`}
    >
      <Flex
        className={`h-[42px] my-[24px] w-full justify-between items-center`}
      >
        <Flex className="items-center gap-[0px]">
          <LogoSvg className="max-h-[42px]" isLight={theme === 'dark'} />
          <Flex className="items-center gap-x-5">
            <div className="animate-pulse p-0.5 w-24 h-6 rounded bg-support-50 dark:bg-bead-loop-gray"></div>
            <div className="animate-pulse p-0.5 w-20 h-6 rounded bg-support-50 dark:bg-bead-loop-gray"></div>
          </Flex>
        </Flex>
        <Flex className="items-center gap-[0px] dark:opacity-70">
          <Flex className="items-center gap-x-[8px] mr-[12px]">
            <div className="animate-pulse p-0.5 w-6 h-6 rounded bg-support-50 dark:bg-bead-loop-gray"></div>
            <div className="animate-pulse p-0.5 w-8 h-6 rounded bg-support-50 dark:bg-bead-loop-gray"></div>
          </Flex>
        </Flex>
      </Flex>
      {renderCards()}
    </div>
  )
}
