import { Suspense } from 'react'
import { useLoaderData } from 'react-router'
import { actions } from 'actions'
import { Editor } from 'pages'
import { EditorSkeleton } from './loading'

type LoaderParams = {
  templateId: string
}

export async function loader({ params }: { params: LoaderParams }) {
  if (!params.templateId) {
    throw new Error('Template id is required')
  }

  let template
  let errorMessage
  try {
    template = await actions.templates.get.byId({ id: params.templateId })
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : 'An unexpected error occurred'
    console.error(err)
  }

  return { template, errorMessage }
}

export default function EditorTemplatePage() {
  const { template, errorMessage } = useLoaderData<typeof loader>()

  if (!template) return <div>TODO: Template Not Found {errorMessage}</div>
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <Editor template={template} isNew={template.id === ''} />
    </Suspense>
  )
}
