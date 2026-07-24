import { ErrorBoundary } from 'shared/ui'

export default function NotFoundPage() {
  return <ErrorBoundary error={{ status: 404 }} />
}
