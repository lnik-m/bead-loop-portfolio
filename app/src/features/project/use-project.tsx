import { useContext } from 'react'
import { ProjectContext } from './project-context'

export const useProject = () => {
  const project = useContext(ProjectContext)
  if (!project) throw new Error('Error: Project context is not defined')
  return project
}
