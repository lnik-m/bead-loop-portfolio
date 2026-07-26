import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import type { Template, Project } from 'core/collections'
import { actions } from 'actions'
import { routes } from 'app/routes'
import { ProjectsContext } from 'features/projects'

interface Props extends PropsWithChildren {
  projects: Project[]
}

export function ProjectsProvider({ projects: data, children }: Props) {
  const navigate = useNavigate()

  const [projects, setProjects] = useState<Project[]>(data)

  const loadProjects = async () => {
    const newProjectList = await actions.projects.get.byUser()
    setProjects([...(newProjectList || [])])
  }

  const addProject = useCallback(
    (templateId: Template['id']) => {
      navigate(routes.projectCreating, {
        state: { templateId }
      })
    },
    [navigate]
  )

  const deleteProject = useCallback(async (projectId: Project['id']) => {
    await actions.projects.delete({ ids: [projectId] })
    const newProjectList = await actions.projects.get.byUser()
    setProjects([...(newProjectList || [])])
  }, [])

  const contextValue = useMemo(
    () => ({
      projects,
      loadProjects,
      addProject,
      deleteProject
    }),
    [projects, addProject, deleteProject]
  )

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  )
}
