import { useContext } from 'react'
import { ThemeContext } from './theme-context'

export const useTheme = () => {
  const theme = useContext(ThemeContext)
  if (!theme) throw new Error('Error: theme context is not defined')
  return theme
}
