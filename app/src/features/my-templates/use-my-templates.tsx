import { useContext } from 'react'
import { MyTemplatesContext } from './my-templates-context'

export const useMyTemplates = () => {
  const myTemplates = useContext(MyTemplatesContext)
  if (!myTemplates)
    throw new Error('Error: My templates context is not defined')
  return myTemplates
}
