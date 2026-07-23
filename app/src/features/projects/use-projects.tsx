import { useContext } from 'react'
import { ProjectsContext } from './projects-context'

export const useProjects = () => {
  const projects = useContext(ProjectsContext)
  if (!projects) throw new Error('Error: Projects context is not defined')
  return projects
}
