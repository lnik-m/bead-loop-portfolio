import type { CellPosition } from '../types'

export function renderEmptyBead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  pos: CellPosition
) {
  const { width, height } = pos
  const radiusX = width / 2
  const radiusY = height / 2

  ctx.shadowColor = 'transparent'
  ctx.fillStyle = 'rgba(200, 200, 200, 0.25)'
  ctx.beginPath()
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = 'rgba(180, 180, 180, 0.4)'
  ctx.lineWidth = 1
  ctx.setLineDash([3, 4])
  ctx.beginPath()
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])

  ctx.fillStyle = 'rgba(180, 180, 180, 0.3)'
  ctx.beginPath()
  ctx.arc(x, y, Math.min(radiusX, radiusY) * 0.15, 0, Math.PI * 2)
  ctx.fill()
}
