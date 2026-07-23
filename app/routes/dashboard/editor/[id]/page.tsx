import { Suspense } from 'react'
import { Await, useLoaderData, useLocation } from 'react-router'
import { actions } from 'actions'
import type { Template } from 'core/collections'
import { Editor } from 'pages'
import { ErrorFallback } from 'shared/ui'
import { EditorSkeleton } from './loading'

type LoaderParams = {
  templateId: string
}

export async function clientLoader({ params }: { params: LoaderParams }) {
  const getTemplates = actions.templates.get.byId({ id: params.templateId })
  return { getTemplates }
}

export default function EditorTemplatePage() {
  const { getTemplates } = useLoaderData<typeof clientLoader>()
  const location = useLocation()

  const templateFromState = location.state as Template | null

  if (templateFromState) {
    return (
      <Editor
        template={templateFromState}
        isNew={templateFromState.id === ''}
      />
    )
  }
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <Await
        resolve={getTemplates}
        errorElement={<ErrorFallback />}
        children={template => {
          if (!template) return
          return <Editor template={template} isNew={template.id === ''} />
        }}
      />
    </Suspense>
  )
}
