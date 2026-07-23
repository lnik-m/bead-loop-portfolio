import type { PropsWithChildren } from 'react'
import type { Template, Project } from 'core/collections'
import { MyTemplatesProvider } from './my-templates-provider'
import { ProjectsProvider } from './projects-provider'
import { MenuProvider } from './menu-provider'

export interface Props extends PropsWithChildren {
  templates: Template[]
  projects: Project[]
}

export const DashboardProviders = ({
  templates,
  projects,
  children
}: Props) => {
  return (
    <MenuProvider>
      <MyTemplatesProvider templates={templates}>
        <ProjectsProvider projects={projects}>{children}</ProjectsProvider>
      </MyTemplatesProvider>
    </MenuProvider>
  )
}
