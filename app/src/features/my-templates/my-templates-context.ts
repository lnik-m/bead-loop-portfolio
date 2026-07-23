import { createContext } from 'react'
import type { Template } from 'core/collections'

export interface MyTemplatesContextType {
  myTemplates: Template[]
  loadTemplates: () => Promise<void>
  deleteTemplate: (templateId: Template['id']) => void
}

export const MyTemplatesContext = createContext<MyTemplatesContextType | null>(
  null
)
