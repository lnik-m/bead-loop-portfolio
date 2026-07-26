import { useCallback } from 'react'
import type { TemplateType } from './types'

export function useCanvasSize(
  cols: number,
  rows: number,
  cellSize: number,
  gap: number,
  type: TemplateType
) {
  const getCanvasWidth = useCallback(() => {
    if (type === 'peyote') {
      return cols * (cellSize + gap) + gap + (cellSize + gap) / 2
    }
    if (type === 'cross') {
      return cols * (cellSize + gap) + gap
    }
    return cols * (cellSize + gap) + gap
  }, [cols, cellSize, gap, type])

  const getCanvasHeight = useCallback(() => {
    if (type === 'cross') {
      const beadHeight = cellSize * 0.6
      return rows * (beadHeight + gap) + gap + beadHeight
    }
    return rows * (cellSize + gap) + gap
  }, [rows, cellSize, gap, type])

  return {
    canvasWidth: getCanvasWidth(),
    canvasHeight: getCanvasHeight()
  }
}
