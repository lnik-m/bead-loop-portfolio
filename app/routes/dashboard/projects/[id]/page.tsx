import { Suspense } from 'react'
import { useLoaderData } from 'react-router'
import { actions } from 'actions'
import { Project } from 'pages'
import { ProjectsSkeleton } from './loading'

type LoaderParams = {
  projectId: string
}

export async function loader({ params }: { params: LoaderParams }) {
  if (!params.projectId) {
    throw new Error('Project id is required')
  }

  let project
  let errorMessage
  try {
    project = await actions.projects.get.byId({ id: params.projectId })
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : 'An unexpected error occurred'
    console.error(err)
  }
  return { project, errorMessage }
}

export default function ProjectPage() {
  const { project, errorMessage } = useLoaderData<typeof loader>()

  if (!project) return <div>TODO: Project Not Found {errorMessage}</div>
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <Project project={project} />
    </Suspense>
  )
}
