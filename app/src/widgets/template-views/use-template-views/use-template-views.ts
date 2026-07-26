import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import type { Project, Template } from 'core/collections'
import { GAP_SIZE, EDITOR_CELL_SIZE, VIEW_CELL_SIZE } from './constants'
import { POSITION_STRATEGIES } from './positions'
import {
  renderEmptyBead,
  renderCheckmark,
  renderEditorFrame,
  RENDER_STRATEGIES
} from './renderers'
import { useCanvasSize } from './canvas-utils'
import { useClickHandler } from './click-handler'
import type { TemplateType } from './types'

export interface Props {
  schema: Template['schema'] | Project['schema']
  isEditor: boolean
  type: TemplateType
  onClick?: (rows: number, columns: number) => void
}

export const useTemplateViews = ({
  schema,
  isEditor,
  type,
  onClick
}: Props) => {
  const cellSize = isEditor ? EDITOR_CELL_SIZE : VIEW_CELL_SIZE
  const gap = GAP_SIZE

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawTrigger, setDrawTrigger] = useState(0)

  const rows = schema?.length || 0
  const cols = schema?.[0]?.length || 0

  const { canvasWidth, canvasHeight } = useCanvasSize(
    cols,
    rows,
    cellSize,
    gap,
    type
  )

  const drawParams = useMemo(
    () => ({
      schema,
      rows,
      cols,
      cellSize,
      gap,
      isEditor,
      canvasWidth,
      canvasHeight,
      type
    }),
    [
      schema,
      rows,
      cols,
      cellSize,
      gap,
      isEditor,
      canvasWidth,
      canvasHeight,
      type
    ]
  )

  const getPosition = POSITION_STRATEGIES[type]

  const drawBeads = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const {
      schema: currentSchema,
      rows: currentRows,
      cols: currentCols,
      cellSize: currentCellSize,
      isEditor: currentIsEditor,
      type: currentType
    } = drawParams

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const renderBead = RENDER_STRATEGIES[currentType]

    for (let i = 0; i < currentRows; i++) {
      const isOddRow = i % 2 !== 0
      const maxCols =
        currentType === 'cross' && !isOddRow ? currentCols - 1 : currentCols

      for (let j = 0; j < maxCols; j++) {
        const cell = currentSchema?.[i]?.[j]
        if (cell === undefined) continue

        const color = typeof cell === 'string' ? cell : cell?.color || ''
        const isBeaded =
          typeof cell === 'string' ? false : cell?.isBeaded || false
        const pos = getPosition(i, j, currentCellSize, gap)
        const { x, y } = pos

        if (color) {
          renderBead({ ctx, x, y, color, pos, cellSize: currentCellSize })
          if (isBeaded) {
            renderCheckmark(ctx, x, y, Math.min(pos.width, pos.height))
          }
          if (currentIsEditor) {
            renderEditorFrame(ctx, x, y, pos)
          }
        } else {
          renderEmptyBead(ctx, x, y, pos)
        }
      }
    }
  }, [drawParams, getPosition, gap])

  useEffect(() => {
    drawBeads()
  }, [drawBeads, drawTrigger])

  const handleClick = useClickHandler(
    canvasRef,
    rows,
    cols,
    cellSize,
    gap,
    type,
    getPosition,
    onClick,
    setDrawTrigger
  )

  return {
    canvasHeight,
    canvasWidth,
    canvasRef,
    handleClick
  }
}
