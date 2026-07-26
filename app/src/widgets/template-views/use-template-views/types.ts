import type { Template } from 'core/collections'

export type TemplateType = Template['type']

export interface CellPosition {
  x: number
  y: number
  isOffset: boolean
  isHorizontal: boolean
  width: number
  height: number
}
