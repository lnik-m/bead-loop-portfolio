import { type ReactNode, useCallback, useMemo, useState } from 'react'
import type { Template } from 'core/collections'
import type { SchemaType } from 'core/collections/template'
import { actions } from 'actions'
import { EditorContext } from 'features/editor'
import { useMyTemplates } from 'features/my-templates'

interface Props {
  children: ReactNode
  template: Template
}

export function EditorProvider({ children, template: data }: Props) {
  const [template, setTemplate] = useState(data)
  const [rows, setRows] = useState(data.schema.length)
  const [columns, setColumns] = useState(data.schema[0].length)
  const [schemaType, setSchemaType] = useState(template.type)

  const { loadTemplates } = useMyTemplates()

  const [isSaving, setIsSaving] = useState(false)
  const saveTemplate = useCallback(
    async (isNew?: boolean) => {
      setIsSaving(true)

      if (isNew) {
        await actions.templates.add({
          title: template.title,
          type: template.type,
          schema: template.schema
        })
      } else {
        await actions.templates.update({
          id: template.id,
          title: template.title,
          type: template.type,
          schema: template.schema
        })
      }

      await loadTemplates()
      setIsSaving(false)
    },
    [template, loadTemplates]
  )

  const updateTemplate = useCallback(
    (data: Partial<Template>) => {
      setTemplate({ ...template, ...data })
    },
    [template]
  )

  const updateRows = useCallback(
    (rows: number) => {
      if (rows === 0) return
      setRows(rows)
      const { schema } = template

      if (schema.length > rows) {
        schema.length = rows
      } else {
        const column = schema[0].map(() => '')
        const add: string[][] = Array(rows - schema.length).fill(column)
        schema.push(...add)
      }

      setTemplate({ ...template, ...schema })
    },
    [template]
  )

  const updateColumns = useCallback(
    (columns: number) => {
      if (columns === 0) return

      setColumns(columns)
      const { schema } = template

      if (schema[0].length > columns) {
        schema.map(row => (row.length = columns))
        setTemplate({ ...template, ...schema })
      } else {
        const add: string[] = Array(columns - schema[0].length).fill('')
        setTemplate({
          ...template,
          schema: schema.map(row => [...row, ...add])
        })
      }
    },
    [template]
  )

  const updateSchemaType = useCallback(
    (type: SchemaType) => {
      setSchemaType(type)
      updateTemplate({ type })
    },
    [updateTemplate]
  )

  const [isEraser, setIsEraser] = useState(false)

  const [currentColor, setCurrentColor] = useState('#DF45BD')
  const updateColor = (color: string) => {
    setCurrentColor(color)
  }

  const contextValue = useMemo(
    () => ({
      /*
      isEditable depends on whether the user is the owner of the template.
      Currently (with auth disabled), it is always true.
       */
      isEditable: true,
      template,
      updateTemplate,
      currentColor,
      updateColor,
      rows,
      columns,
      updateRows,
      updateColumns,
      schemaType,
      updateSchemaType,
      isEraser,
      erase: () => setIsEraser(true),
      paint: () => setIsEraser(false),
      saveTemplate,
      isSaving
    }),
    [
      template,
      updateTemplate,
      currentColor,
      rows,
      columns,
      updateRows,
      updateColumns,
      schemaType,
      isEraser,
      saveTemplate,
      updateSchemaType,
      isSaving
    ]
  )

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  )
}
