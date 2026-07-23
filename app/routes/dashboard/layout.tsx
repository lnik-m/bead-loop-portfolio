import { Suspense } from 'react'
import { Await, Outlet, useLoaderData } from 'react-router'
import { actions } from 'actions'
import { DashboardLayout } from 'widgets'
import { ErrorFallback } from 'shared/ui'
import { DashboardSkeleton } from './loading'

export async function clientLoader() {
  const getData = Promise.all([
    actions.templates.get.byUser(),
    actions.projects.get.byUser()
  ])
  return { getData }
}

export default function Layout() {
  const { getData } = useLoaderData<typeof clientLoader>()
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Await
        resolve={getData}
        errorElement={<ErrorFallback />}
        children={([templates, projects]) => {
          return (
            <DashboardLayout
              templates={templates || []}
              projects={projects || []}
            >
              <Outlet />
            </DashboardLayout>
          )
        }}
      />
    </Suspense>
  )
}
