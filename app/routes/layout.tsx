import { Meta, Links, Scripts, ScrollRestoration, Outlet } from 'react-router'
import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core'
import { I18nProvider, ThemeProvider } from 'app/providers'
import { useI18n } from 'features/i18n'
import { useTheme } from 'features/theme'
import type { Route } from '../+types/root'
import '@mantine/core/styles.css'

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'theme'
})

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
  }
]

const AppLayoutContent = () => {
  const { locale } = useI18n()
  const { theme } = useTheme()
  return (
    <html lang={locale} className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div
          className={`${theme} bg-bead-loop-light-70 dark:bg-bead-loop-dark-20`}
        >
          <MantineProvider
            forceColorScheme={theme}
            colorSchemeManager={colorSchemeManager}
          >
            <Outlet />
          </MantineProvider>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Layout() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AppLayoutContent />
      </ThemeProvider>
    </I18nProvider>
  )
}
