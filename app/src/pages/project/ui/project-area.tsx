import { useCallback, useRef } from 'react'
import Draggable from 'react-draggable'
import { ActionsMenu, TemplateViews } from 'widgets'
import { useProject } from 'features/project'
import { useActionsMenu } from 'features/actions-menu'
import { Flex } from 'shared/ui'

export const ProjectArea = () => {
  const nodeRef = useRef(null)

  const {
    project: { title, type, schema },
    project,
    updateProject
  } = useProject()
  const { scale, rotate, isMoving } = useActionsMenu()

  const toggleIsBeaded = useCallback(
    (row: number, column: number) => {
      schema[row][column] = {
        ...schema[row][column],
        isBeaded: !schema[row][column].isBeaded
      }
      updateProject({ ...project, schema })
    },
    [schema, updateProject, project]
  )
  return (
    <Flex
      column
      className="col-span-2 bg-bead-loop-light-50 dark:bg-bead-loop-gray-20 h-full rounded-2xl p-4"
    >
      <Flex className="justify-between">
        <p className="text-[18px] font-medium truncate">{title}</p>
        <ActionsMenu />
      </Flex>
      <div
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
              isProject
              schema={schema}
              type={type}
              className={`${scale} ${rotate} ${
                isMoving && 'hover:cursor-grab active:cursor-grabbing'
              }`}
              onClick={isMoving ? undefined : toggleIsBeaded}
            />
          </div>
        </Draggable>
      </div>
    </Flex>
  )
}
