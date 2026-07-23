import { createContext } from 'react'
import type { Template } from 'core/collections'
import type { SchemaType } from 'core/collections/template'

export interface EditorContextType {
  isEditable: boolean
  currentColor: string
  updateColor: (color: string) => void
  template: Template
  updateTemplate: (data: Partial<Template>) => void
  rows: number
  updateRows: (rows: number) => void
  columns: number
  updateColumns: (columns: number) => void
  schemaType: SchemaType
  updateSchemaType: (type: SchemaType) => void
  isEraser: boolean
  erase: () => void
  paint: () => void
  saveTemplate: (isNew?: boolean) => Promise<void>
  isSaving: boolean
}

export const EditorContext = createContext<EditorContextType | null>(null)
