import { Outlet, useRouteError } from 'react-router'
import { ErrorBoundary as ErrorBoundaryComponent } from 'shared/ui'
import './globals.css'

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()
  return <ErrorBoundaryComponent error={error} />
}
