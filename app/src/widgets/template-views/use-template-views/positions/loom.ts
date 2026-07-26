import type { CellPosition } from '../types'
import { CANVAS_PADDING } from '../constants'

export function getLoomPosition(
  row: number,
  col: number,
  cellSize: number,
  gap: number
): CellPosition {
  return {
    x: col * (cellSize + gap) + cellSize / 2 + gap / 2 + CANVAS_PADDING,
    y: row * (cellSize + gap) + cellSize / 2 + gap / 2 + CANVAS_PADDING,
    isOffset: false,
    isHorizontal: true,
    width: cellSize,
    height: cellSize
  }
}
