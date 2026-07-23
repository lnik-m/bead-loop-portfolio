import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { ThemeContext } from 'features/theme'
import type { Theme } from 'shared/types'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [localTheme, setLocalTheme] = useState<Theme>('light')
  const [theme, setTheme] = useState<Theme>(localTheme)

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
      ? (localStorage.getItem('theme') as Theme)
      : 'light'
    setLocalTheme(localTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }, [theme])

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  )
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
