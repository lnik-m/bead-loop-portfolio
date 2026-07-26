import { ErrorBoundary } from 'shared/ui'

export default function NotFoundPage() {
  return (
    <>
      <title>404 – Bead Loop</title>
      <ErrorBoundary error={{ status: 404 }} />
    </>
  )
}
