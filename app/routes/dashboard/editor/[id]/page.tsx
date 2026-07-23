import { Suspense } from 'react'
import { useLoaderData } from 'react-router'
import { actions } from 'actions'
import type { Template } from 'core/collections'
import { Editor } from 'pages'
import { Loading } from './loading'

type LoaderParams = {
  templateId: string
}

export async function clientLoader({ params }: { params: LoaderParams }) {
  if (!params.templateId) {
    throw new Error('Template id is required')
  }
  if (params.templateId === 'new') {
    return {
      template: {
        id: '',
        title: 'New template',
        type: 'loom',
        schema: [
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ],
        isPublished: false
      } as Template
    }
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
  const { template, errorMessage } = useLoaderData<typeof clientLoader>()

  if (!template) return <div>TODO: Template Not Found {errorMessage}</div>
  return (
    <Suspense fallback={<Loading />}>
      <Editor template={template} isNew={template.id === ''} />
    </Suspense>
  )
}
