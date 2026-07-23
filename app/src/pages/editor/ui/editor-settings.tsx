import { type RefObject, useState } from 'react'
import { useNavigate } from 'react-router'
import { NumberInput, Select, TextInput } from '@mantine/core'
import { useFocusTrap } from '@mantine/hooks'
import type { SchemaType } from 'core/collections/template'
import { routes } from 'app/routes'
import { useEditor } from 'features/editor'
import { useI18n } from 'features/i18n'
import { Button, Flex } from 'shared/ui'

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
    'peyote'
    // TODO: add views
    // 'cross',
    // 'flower',
    // 'diamond',
    // 'detailed'
  ].map(type => {
    const text = localize(`dashboard.schemaTypes.${type as SchemaType}`)
    return {
      value: type,
      label: text.at(0)?.toUpperCase() + text.slice(1)
    }
  })
  const focusTrapRef = useFocusTrap(true)
  const [error, setError] = useState('')
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
          label={localize('dashboard.editor.labels.title')}
          value={template.title}
          onChange={({ currentTarget }) => {
            setError(
              !currentTarget.value
                ? localize('dashboard.editor.labels.emptyTitle')
                : ''
            )
            updateTemplate({ title: currentTarget.value })
          }}
        />
        <Select
          disabled={!isEditable}
          label={localize('dashboard.editor.labels.schemaType')}
          checkIconPosition="right"
          value={schemaType}
          data={schemaTypes}
          onChange={value => updateSchemaType(value as unknown as SchemaType)}
          allowDeselect={false}
        />
        <Flex className="grid grid-cols-2">
          <NumberInput
            disabled={!isEditable}
            min={1}
            max={50}
            label={localize('dashboard.editor.labels.rows')}
            value={rows}
            onChange={v => updateRows(+v)}
          />
          <NumberInput
            disabled={!isEditable}
            min={1}
            max={50}
            label={localize('dashboard.editor.labels.columns')}
            value={columns}
            onChange={v => updateColumns(+v)}
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
          {localize('dashboard.editor.buttons.save')}
        </Button>
        <Button
          theme="dark"
          onClick={() => exportSchemaAction(schemaRef)}
          disabled={!!error}
        >
          {localize('dashboard.editor.buttons.export')}
        </Button>
      </Flex>
    </Flex>
  )
}
