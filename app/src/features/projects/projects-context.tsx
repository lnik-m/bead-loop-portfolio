import { createContext } from 'react'
import type { Project, Template } from 'core/collections'

export interface ProjectsContextType {
  projects: Project[]
  loadProjects: () => Promise<void>
  addProject: (templateId: Template['id']) => void
  deleteProject: (projectId: Project['id']) => Promise<void>
}

export const ProjectsContext = createContext<ProjectsContextType | null>(null)
