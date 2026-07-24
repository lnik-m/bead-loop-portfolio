import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'
import type { Template } from 'core/collections'
import { actions } from 'actions'
import { MyTemplatesContext } from 'features/my-templates'

interface Props extends PropsWithChildren {
  templates: Template[]
}

export function MyTemplatesProvider({ templates, children }: Props) {
  const [myTemplates, setMyTemplates] = useState<Template[]>(templates)

  const loadTemplates = useCallback(async () => {
    const newMyTemplateList = await actions.templates.get.byUser()
    setMyTemplates([...(newMyTemplateList || [])])
  }, [])

  const deleteTemplate = useCallback(async (templateId: Template['id']) => {
    await actions.templates.delete({ ids: [templateId] })
    const newMyTemplateList = await actions.templates.get.byUser()
    setMyTemplates([...(newMyTemplateList || [])])
  }, [])

  const contextValue = useMemo(
    () => ({
      myTemplates,
      deleteTemplate,
      loadTemplates
    }),
    [myTemplates, deleteTemplate, loadTemplates]
  )

  return (
    <MyTemplatesContext.Provider value={contextValue}>
      {children}
    </MyTemplatesContext.Provider>
  )
}
