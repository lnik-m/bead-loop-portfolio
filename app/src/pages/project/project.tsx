import type { Project } from 'core/collections'
import { ProjectProvider } from 'app/providers'
import { Flex } from 'shared/ui'
import { ProjectArea, ProjectInfo } from './ui'

interface Props {
  project: Project
}

export const ProjectPage = ({ project }: Props) => {
  return (
    <ProjectProvider project={project}>
      <Flex className="grid grid-cols-3 h-full gap-6">
        <ProjectArea />
        <ProjectInfo />
      </Flex>
    </ProjectProvider>
  )
}
