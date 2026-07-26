import type { CellPosition } from '../types'
import { CANVAS_PADDING } from '../constants'

export function getPeyotePosition(
  row: number,
  col: number,
  cellSize: number,
  gap: number
): CellPosition {
  const isOddRow = row % 2 !== 0
  const offset = isOddRow ? (cellSize + gap) / 2 : 0

  return {
    x:
      col * (cellSize + gap) + cellSize / 2 + gap / 2 + offset + CANVAS_PADDING,
    y: row * (cellSize + gap) + cellSize / 2 + gap / 2 + CANVAS_PADDING,
    isOffset: isOddRow,
    isHorizontal: false,
    width: cellSize,
    height: cellSize
  }
}
