import type { PropsWithChildren } from 'react'
import { useLocation } from 'react-router'
import type { Template, Project } from 'core/collections'
import { DashboardProviders } from 'app/providers'
import { routes } from 'app/routes'
import { Header } from 'widgets'
import { useTheme } from 'features/theme'
import { Flex } from 'shared/ui'

interface Props extends PropsWithChildren {
  templates: Template[]
  projects: Project[]
}

export const DashboardLayout = ({ templates, projects, children }: Props) => {
  const { theme } = useTheme()
  const { pathname } = useLocation()
  const fullScreenPage =
    pathname.includes(routes.editTemplate) || pathname.includes(routes.project)
  return (
    <DashboardProviders templates={templates} projects={projects}>
      <div
        className={`h-screen px-[70px] text-bead-loop-black dark:text-bead-loop-light-05 
        ${fullScreenPage ? 'overflow-hidden' : ''}`}
      >
        <Header className="h-[42px] my-[24px]" />
        <Flex
          className={`min-h-[calc(100vh-100px)] gap-[20px]
          ${fullScreenPage ? 'max-h-[calc(100vh-100px)]' : ''}`}
        >
          <div className="max-w-full overflow-hidden dark:text-bead-loop-light-05 flex-grow p-3">
            {children}
          </div>
        </Flex>
      </div>
    </DashboardProviders>
  )
}
