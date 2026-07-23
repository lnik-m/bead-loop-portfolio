import type { PropsWithChildren } from 'react'
import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core'
import { useI18n } from 'features/i18n'
import { useTheme } from 'features/theme'
import '@mantine/core/styles.css'

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'theme'
})

export const Layout = ({ children }: PropsWithChildren) => {
  const { locale } = useI18n()
  const { theme } = useTheme()
  return (
    <html lang={locale} className={theme} suppressHydrationWarning>
      <body className={'bg-beadLoop-light70 dark:bg-beadLoop-dark20'}>
        <MantineProvider
          forceColorScheme={theme}
          colorSchemeManager={colorSchemeManager}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
