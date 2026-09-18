import { Outlet, useRouteError, type MetaFunction } from 'react-router'
import { ErrorBoundary as ErrorBoundaryComponent } from 'shared/ui'
import './globals.css'

export const meta: MetaFunction = () => {
  const title = 'Bead Loop'
  const description = 'Platform for creating and editing beading patterns'
  const url = 'https://bead-loop.netlify.app/'
  const image = 'https://bead-loop.netlify.app/preview.png'

  return [
    { title },
    { name: 'description', content: description },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()
  return <ErrorBoundaryComponent error={error} />
}
