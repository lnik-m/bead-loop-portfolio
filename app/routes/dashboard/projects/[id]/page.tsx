import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router'
import { actions } from 'actions'
import { Project } from 'pages'
import { ErrorFallback } from 'shared/ui'
import { ProjectsSkeleton } from './loading'

type LoaderParams = {
  projectId: string
}

export async function clientLoader({ params }: { params: LoaderParams }) {
  const getProjects = actions.projects.get.byId({ id: params.projectId })
  return { getProjects }
}

export default function ProjectPage() {
  const { getProjects } = useLoaderData<typeof clientLoader>()

  // TODO navigate with state
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <Await
        resolve={getProjects}
        errorElement={<ErrorFallback />}
        children={project => {
          if (!project) return
          return <Project project={project} />
        }}
      />
    </Suspense>
  )
}
