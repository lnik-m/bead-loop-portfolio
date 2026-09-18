import { lazy, Suspense, useEffect } from 'react'
import { DashboardSkeleton } from '../loading'

const MyProjects = lazy(
  () => import('../../../src/pages/my-projects/my-projects')
)

export default function MyProjectsPage() {
  useEffect(() => {
    document.title = 'Bead Loop'
  }, [])
  return (
    <Suspense fallback={<DashboardSkeleton hideHeader />}>
      <MyProjects />
    </Suspense>
  )
}
