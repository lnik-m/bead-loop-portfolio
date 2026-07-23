import { createContext } from 'react'
import type { Project } from 'core/collections'

export interface ProjectContextType {
  project: Project
  updateProject: (data: Partial<Project>) => void
  saveProgress: () => Promise<void>
  finishBeading: () => Promise<void>
  isSaving: boolean
  isFinishing: boolean
}

export const ProjectContext = createContext<ProjectContextType | null>(null)
