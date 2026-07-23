import { useContext } from 'react'
import { EditorContext } from './editor-context'

export const useEditor = () => {
  const template = useContext(EditorContext)
  if (!template) throw new Error('Error: Editor context is not defined')
  return template
}
