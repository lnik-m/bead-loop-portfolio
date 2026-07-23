import { createContext } from 'react'
import type { Theme } from 'shared/types'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}
export const ThemeContext = createContext<ThemeContextType | null>(null)
