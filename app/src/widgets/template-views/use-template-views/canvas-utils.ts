import { useCallback } from 'react'
import type { TemplateType } from './types'
import {
  CANVAS_PADDING,
  CROSS_VERTICAL_HEIGHT,
  CROSS_BEAD_RATIO
} from './constants'

export function useCanvasSize(
  cols: number,
  rows: number,
  cellSize: number,
  gap: number,
  type: TemplateType
) {
  const getCanvasWidth = useCallback(() => {
    let width = 0
    if (type === 'peyote') {
      width = cols * (cellSize + gap) + gap + (cellSize + gap) / 2
    } else if (type === 'cross') {
      width = cols * (cellSize + gap) + gap
    } else {
      width = cols * (cellSize + gap) + gap
    }
    return width + CANVAS_PADDING * 2
  }, [cols, cellSize, gap, type])

  const getCanvasHeight = useCallback(() => {
    let height = 0
    if (type === 'cross') {
      const baseHeight = cellSize * CROSS_BEAD_RATIO
      const maxBeadHeight = baseHeight * CROSS_VERTICAL_HEIGHT
      height = rows * (baseHeight + gap) + gap + maxBeadHeight
    } else {
      height = rows * (cellSize + gap) + gap
    }
    return height + CANVAS_PADDING * 2
  }, [rows, cellSize, gap, type])

  return {
    canvasWidth: getCanvasWidth(),
    canvasHeight: getCanvasHeight()
  }
}
