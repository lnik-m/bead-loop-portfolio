import { Suspense } from 'react'
import { Await, useLoaderData, useLocation } from 'react-router'
import { actions } from 'actions'
import type { Project as ProjectCollection } from 'core/collections'
import { Project } from 'pages'
import { ErrorFallback } from 'shared/ui'
import { ProjectsSkeleton } from '../loading'

type LoaderParams = {
  projectId: string
}

export async function clientLoader({ params }: { params: LoaderParams }) {
  const getProjects = actions.projects.get.byId({ id: params.projectId })
  return { getProjects }
}

function ProjectPageContent() {
  const { getProjects } = useLoaderData<typeof clientLoader>()
  const location = useLocation()
  const projectFromState = location.state as ProjectCollection | null

  if (projectFromState) {
    return <Project project={projectFromState} />
  }
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <Await
        resolve={getProjects}
        errorElement={<ErrorFallback />}
        children={project => {
          if (!project) return null
          return <Project project={project} />
        }}
      />
    </Suspense>
  )
}

export default function ProjectPage() {
  return (
    <>
      <title>Project – Bead Loop</title>
      <ProjectPageContent />
    </>
  )
}
