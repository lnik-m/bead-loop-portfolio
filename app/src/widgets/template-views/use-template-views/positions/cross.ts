import type { CellPosition } from '../types'
import {
  CANVAS_PADDING,
  CROSS_HORIZONTAL_WIDTH,
  CROSS_VERTICAL_WIDTH,
  CROSS_VERTICAL_HEIGHT,
  CROSS_HORIZONTAL_HEIGHT,
  CROSS_BEAD_RATIO
} from '../constants'

export function getCrossPosition(
  row: number,
  col: number,
  cellSize: number,
  gap: number
): CellPosition {
  const isOddRow = row % 2 !== 0
  const isEvenRow = !isOddRow

  const w = cellSize
  const h = cellSize * CROSS_BEAD_RATIO

  const horizontalOffset = isEvenRow ? w / 2 : 0
  const yOffset = row * (h + gap) + h / 2 + gap / 2 + h / 2

  return {
    x: col * (w + gap) + w / 2 + gap / 2 + horizontalOffset + CANVAS_PADDING,
    y: yOffset + CANVAS_PADDING,
    isOffset: isEvenRow,
    isHorizontal: isOddRow,
    width: isOddRow ? w * CROSS_HORIZONTAL_WIDTH : w * CROSS_VERTICAL_WIDTH,
    height: isOddRow ? h * CROSS_HORIZONTAL_HEIGHT : h * CROSS_VERTICAL_HEIGHT
  }
}
