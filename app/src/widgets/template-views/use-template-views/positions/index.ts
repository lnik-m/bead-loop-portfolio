import type { CellPosition, TemplateType } from '../types'
import { getCrossPosition } from './cross'
import { getLoomPosition } from './loom'
import { getPeyotePosition } from './peyote'

export const POSITION_STRATEGIES: Record<
  TemplateType,
  (row: number, col: number, cellSize: number, gap: number) => CellPosition
> = {
  loom: getLoomPosition,
  peyote: getPeyotePosition,
  cross: getCrossPosition
}
