import { useI18n } from 'features/i18n'
import { useProjects } from 'features/projects'
import { Divider, Flex } from 'shared/ui'
import { ProjectCard, ProjectEmpty } from './ui'

export const MyProjects = () => {
  const { localize } = useI18n()
  const { projects } = useProjects()

  const finishedProjects = projects.filter(project => project.progress >= 100)

  if (projects.length === 0) return <ProjectEmpty />
  return (
    <>
      <Divider label={localize('projects.tabs.current')} className="mb-2" />
      <Flex className="max-w-full flex-wrap gap-3" isGap>
        {projects
          .filter(project => project.progress < 100)
          .map(project => (
            <ProjectCard key={`${project.id}-progress`} project={project} />
          ))}
      </Flex>

      {finishedProjects.length > 0 && (
        <>
          <Divider
            label={localize('projects.tabs.finished')}
            className="mt-5 mb-2"
          />
          <Flex className="max-w-full flex-wrap gap-3" isGap>
            {finishedProjects.map(project => (
              <ProjectCard key={`${project.id}-finished`} project={project} />
            ))}
          </Flex>
        </>
      )}
    </>
  )
}
