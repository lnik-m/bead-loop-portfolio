import { routes } from 'app/routes'
import { Link } from 'react-router'
import type { Project } from 'core/collections'
import { TemplateViews } from 'widgets'
import { useI18n } from 'features/i18n'
import { Flex } from 'shared/ui'
import { ProjectProgress } from './project-progress'
import { ProjectMenu } from './project-menu'

interface Props {
  project: Project
}

export const ProjectCard = ({ project }: Props) => {
  const { localize } = useI18n()
  const { schema, type, title, progress } = project

  return (
    <Flex
      className="w-[268px] h-[208px] gap-0
        rounded-md border-[4px]
        bg-bead-loop-light-50 dark:bg-bead-loop-gray-20
        border-bead-loop-light-50 dark:border-bead-loop-gray-20
        overflow-hidden"
      isGap
      column
    >
      <Link
        to={`${routes.project}${project.id}`}
        state={project}
        className="flex-1"
      >
        <div
          className="relative w-full h-[144px]
            bg-support-50 dark:bg-bead-loop-gray
            flex items-center justify-center
            overflow-hidden"
        >
          <div className="flex items-center justify-center w-full h-full">
            <TemplateViews
              className="scale-[0.5] [&>div]:flex [&>div]:items-center [&>div]:justify-center"
              schema={schema}
              type={type}
            />
          </div>
        </div>
      </Link>

      <Flex className="justify-between p-2 relative">
        <ProjectProgress
          progress={progress}
          className="absolute top-[-6px] right-0"
        />
        <Flex
          className="gap-0 text-bead-loop-dark dark:text-bead-loop-blue-light"
          column
          isGap
        >
          <h4 className="truncate max-w-[210px]" title={title}>
            {title}
          </h4>
          <div className="opacity-50 text-sm">
            {localize(`dashboard.schemaTypes.${type}`)}
          </div>
        </Flex>
        <ProjectMenu projectId={project.id} />
      </Flex>
    </Flex>
  )
}
