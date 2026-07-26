import type { CellPosition } from '../types'

export function getLoomPosition(
  row: number,
  col: number,
  cellSize: number,
  gap: number
): CellPosition {
  return {
    x: col * (cellSize + gap) + cellSize / 2 + gap / 2,
    y: row * (cellSize + gap) + cellSize / 2 + gap / 2,
    isOffset: false,
    isHorizontal: true,
    width: cellSize,
    height: cellSize
  }
}
