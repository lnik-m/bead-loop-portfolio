import { IconMoon, IconSun } from '@tabler/icons-react'

import { useTheme } from 'features/theme'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
    </button>
  )
}
