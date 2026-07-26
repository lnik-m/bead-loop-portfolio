import type { CellPosition } from '../types'

export function renderEditorFrame(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  pos: CellPosition
) {
  ctx.shadowColor = 'transparent'
  ctx.strokeStyle = 'rgba(79, 59, 214, 0.3)'
  ctx.lineWidth = 1.5
  ctx.setLineDash([2, 2])

  const halfW = pos.width / 2 + 2
  const halfH = pos.height / 2 + 2
  ctx.beginPath()
  ctx.ellipse(x, y, halfW, halfH, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])
}
