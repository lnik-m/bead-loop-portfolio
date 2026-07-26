import type { CellPosition } from '../types'

export function getCrossPosition(
  row: number,
  col: number,
  cellSize: number,
  gap: number
): CellPosition {
  const isOddRow = row % 2 !== 0
  const isEvenRow = !isOddRow
  const w = cellSize
  const h = cellSize * 0.7

  const horizontalOffset = isEvenRow ? w / 2 : 0
  const yOffset = row * (h + gap) + h / 2 + gap / 2 + h / 2

  return {
    x: col * (w + gap) + w / 2 + gap / 2 + horizontalOffset,
    y: yOffset,
    isOffset: isEvenRow,
    isHorizontal: isOddRow,
    width: isOddRow ? w : w * 0.55,
    height: isOddRow ? h * 0.65 : h * 1.2
  }
}
