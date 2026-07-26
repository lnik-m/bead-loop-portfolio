import { darkenColor } from '../utils'
import type { BeadRendererProps } from './types'
import { DARKEN_PERCENT } from '../constants'

export function renderLoomBead({
  ctx,
  color,
  cellSize,
  x,
  y
}: BeadRendererProps) {
  const radius = cellSize / 2

  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
  ctx.shadowBlur = 4
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 2

  const gradient = ctx.createRadialGradient(
    x - radius * 0.3,
    y - radius * 0.3,
    radius * 0.1,
    x,
    y,
    radius
  )
  gradient.addColorStop(0.7, color)
  gradient.addColorStop(1, darkenColor(color, DARKEN_PERCENT))

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()

  ctx.shadowColor = 'transparent'
  const highlight = ctx.createRadialGradient(
    x - radius * 0.3,
    y - radius * 0.35,
    radius * 0.05,
    x - radius * 0.2,
    y - radius * 0.25,
    radius * 0.4
  )
  highlight.addColorStop(0, 'rgba(255, 255, 255, 0.7)')
  highlight.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = highlight
  ctx.fill()

  ctx.shadowColor = 'transparent'
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.stroke()
}
