import type { CellPosition } from '../types'

export interface BeadRendererProps {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color: string
  pos: CellPosition
  cellSize: number
}

export type BeadRenderer = (props: BeadRendererProps) => void
