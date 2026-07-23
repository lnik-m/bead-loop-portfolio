import { IconBrush, IconEraser } from '@tabler/icons-react'

import { type RefObject, useCallback, useRef } from 'react'
import Draggable from 'react-draggable'
import { ColorInput } from '@mantine/core'
import { ActionsMenu, TemplateViews } from 'widgets'
import { useActionsMenu } from 'features/actions-menu'
import { useEditor } from 'features/editor'
import { Flex, ActionIcon } from 'shared/ui'

interface Props {
  schemaRef: RefObject<any>
}

export const EditorArea = ({ schemaRef }: Props) => {
  const {
    template,
    updateTemplate,
    currentColor,
    updateColor,
    isEraser,
    erase,
    paint,
    isEditable
  } = useEditor()
  const { scale, rotate, isMoving } = useActionsMenu()
  const nodeRef = useRef(null)

  const changeBeadColor = useCallback(
    (row: number, column: number) => {
      if (!isEditable) return
      const { schema } = template
      schema[row][column] = isEraser ? '' : currentColor
      updateTemplate({ ...template, schema })
    },
    [template, currentColor, updateTemplate, isEraser, isEditable]
  )
  return (
    <Flex
      column
      className="col-span-5 bg-beadLoop-light50 dark:bg-beadLoop-gray20 rounded-2xl p-4"
    >
      <Flex className="justify-between">
        <Flex>
          <ActionIcon isActive={isEraser} onClick={erase}>
            <IconEraser />
          </ActionIcon>
          <ActionIcon isActive={!isEraser} onClick={paint}>
            <IconBrush />
          </ActionIcon>
          <ColorInput
            size="sm"
            className="max-w-36"
            defaultValue={currentColor}
            onChangeEnd={updateColor}
            disabled={isEraser}
            disallowInput
          />
        </Flex>
        <ActionsMenu />
      </Flex>
      <div
        ref={schemaRef}
        className="flex overflow-scroll scroll-m-2 scr bg-white rounded-xl h-full p-3 justify-center items-center"
        style={{
          minHeight: 'calc(100vh - 198px)',
          maxHeight: 'calc(100vh - 198px)',
          cursor: isMoving ? 'default' : 'crosshair'
        }}
      >
        <Draggable nodeRef={nodeRef} disabled={!isMoving}>
          <div ref={nodeRef}>
            <TemplateViews
              isEditor
              schema={template.schema}
              type={template.type}
              className={`${scale} ${rotate} ${
                isMoving && 'hover:cursor-grab active:cursor-grabbing'
              }`}
              onClick={isMoving ? undefined : changeBeadColor}
            />
          </div>
        </Draggable>
      </div>
    </Flex>
  )
}
