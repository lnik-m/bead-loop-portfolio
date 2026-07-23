import { Suspense } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import { Loader } from '@mantine/core'
import { actions } from 'actions'
import { DashboardLayout } from 'widgets'
import { Flex } from 'shared/ui'

export async function clientLoader() {
  const templates = await actions.templates.get.byUser()
  const projects = await actions.projects.get.byUser()
  return { templates, projects }
}

export default function Layout() {
  const { templates, projects } = useLoaderData<typeof clientLoader>()
  return (
    <Suspense
      fallback={
        <Flex className="items-end justify-center h-1/2 mt-[50px]">
          <Loader color="accent" size="lg" />
        </Flex>
      }
    >
      <DashboardLayout templates={templates || []} projects={projects || []}>
        <Outlet />
      </DashboardLayout>
    </Suspense>
  )
}
