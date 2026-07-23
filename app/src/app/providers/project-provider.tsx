import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'
import type { Project } from 'core/collections'
import { actions } from 'actions'
import { ProjectContext } from 'features/project'
import { useProjects } from 'features/projects'
import { getMaterials } from 'api/utils'

interface Props extends PropsWithChildren {
  project: Project
}

export function ProjectProvider({ project: data, children }: Props) {
  const { loadProjects } = useProjects()

  const [project, setProject] = useState<Project>(data)

  const updateProject = useCallback(
    (data: Partial<Project>) => {
      setProject({ ...project, ...data })
    },
    [project]
  )

  const [isSaving, setIsSaving] = useState(false)
  const saveProgress = useCallback(async () => {
    setIsSaving(true)
    await actions.projects.update({
      id: project.id,
      title: project.title,
      type: project.type,
      schema: project.schema,
      materials: project.materials,
      progress: project.progress
    })
    await loadProjects()
    setIsSaving(false)
  }, [project, loadProjects])

  const [isFinishing, setIsFinishing] = useState(false)
  const finishBeading = useCallback(async () => {
    setIsFinishing(true)
    const schema = project.schema.map(row =>
      row.map(({ color }) => ({ color, isBeaded: !!color }))
    )
    await actions.projects.update({
      id: project.id,
      title: project.title,
      type: project.type,
      schema,
      materials: getMaterials(schema),
      progress: 100
    })
    await loadProjects()
    setIsFinishing(false)
  }, [project, loadProjects])

  const contextValue = useMemo(
    () => ({
      project,
      updateProject,
      saveProgress,
      finishBeading,
      isSaving,
      isFinishing
    }),
    [project, updateProject, saveProgress, finishBeading, isSaving, isFinishing]
  )

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  )
}
