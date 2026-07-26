import { type RefObject, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Select, TextInput } from '@mantine/core'
import { useFocusTrap } from '@mantine/hooks'
import type { SchemaType } from 'core/collections/template'
import { routes } from 'app/routes'
import { useEditor } from 'features/editor'
import { useI18n } from 'features/i18n'
import { Button, Flex } from 'shared/ui'
import { SchemaSizeInput } from './schema-size-input'
import { useSchemaNormalization } from './use-schema-normalization'

interface Props {
  exportSchemaAction: (ref: RefObject<any>) => void
  schemaRef: RefObject<any>
  isNew?: boolean
}

export const EditorSettings = ({
  exportSchemaAction,
  schemaRef,
  isNew
}: Props) => {
  const { localize } = useI18n()

  const navigate = useNavigate()

  const {
    isEditable,
    rows,
    columns,
    template,
    updateRows,
    updateColumns,
    schemaType,
    updateSchemaType,
    updateTemplate,
    saveTemplate,
    isSaving
  } = useEditor()
  const schemaTypes: { value: string; label: string }[] = [
    'loom',
    'peyote',
    'cross'
  ].map(type => {
    const text = localize(`dashboard.schemaTypes.${type as SchemaType}`)
    return {
      value: type,
      label: text.at(0)?.toUpperCase() + text.slice(1)
    }
  })
  const focusTrapRef = useFocusTrap(true)
  const [error, setError] = useState('')

  const { normalizeValue, normalizeForSchemaType, getLimits, getStep } =
    useSchemaNormalization(rows, columns)

  useEffect(() => {
    const updates = normalizeForSchemaType(schemaType)
    if (updates.rows) updateRows(updates.rows)
    if (updates.cols) updateColumns(updates.cols)
  }, [schemaType, normalizeForSchemaType])
  return (
    <Flex
      column
      className="col-span-2
      bg-bead-loop-light-50 dark:bg-bead-loop-gray-20
       h-full rounded-2xl p-4 text-[15px] justify-between"
    >
      <Flex column>
        <TextInput
          error={error}
          ref={focusTrapRef}
          disabled={!isEditable}
          label={localize('editor.labels.title')}
          value={template.title}
          onChange={({ currentTarget }) => {
            setError(
              !currentTarget.value ? localize('editor.labels.emptyTitle') : ''
            )
            updateTemplate({ title: currentTarget.value })
          }}
        />
        <Select
          disabled={!isEditable}
          label={localize('editor.labels.schemaType')}
          checkIconPosition="right"
          value={schemaType}
          data={schemaTypes}
          onChange={value => updateSchemaType(value as unknown as SchemaType)}
          allowDeselect={false}
        />
        <Flex className="grid grid-cols-2">
          <SchemaSizeInput
            value={rows}
            onChange={updateRows}
            dimension={'rows'}
            schemaType={schemaType}
            disabled={!isEditable}
            normalizeValue={normalizeValue}
            getLimits={getLimits}
            getStep={getStep}
          />
          <SchemaSizeInput
            value={columns}
            onChange={updateColumns}
            dimension={'columns'}
            schemaType={schemaType}
            disabled={!isEditable}
            normalizeValue={normalizeValue}
            getLimits={getLimits}
            getStep={getStep}
          />
        </Flex>
      </Flex>

      <Flex column>
        <Button
          disabled={!isEditable || !!error}
          loading={isSaving}
          onClick={() => {
            saveTemplate(isNew).then(() => navigate(routes.myTemplates))
          }}
        >
          {localize('editor.buttons.save')}
        </Button>
        <Button
          theme="dark"
          onClick={() => exportSchemaAction(schemaRef)}
          disabled={!!error}
        >
          {localize('editor.buttons.export')}
        </Button>
      </Flex>
    </Flex>
  )
}
