import { darkenColor } from '../utils'
import type { BeadRendererProps } from './types'
import { DARKEN_PERCENT_CROSS } from '../constants'

export function renderCrossBead({ ctx, color, x, y, pos }: BeadRendererProps) {
  const w = pos.width
  const h = pos.height
  const radiusX = w / 2
  const radiusY = h / 2

  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
  ctx.shadowBlur = 4
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 2

  const gradient = ctx.createRadialGradient(
    x - w * 0.25,
    y - h * 0.25,
    Math.min(w, h) * 0.1,
    x,
    y,
    Math.max(w, h) * 0.6
  )
  gradient.addColorStop(0.5, color)
  gradient.addColorStop(1, darkenColor(color, DARKEN_PERCENT_CROSS))

  ctx.beginPath()
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()

  ctx.shadowColor = 'transparent'
  const highlight = ctx.createRadialGradient(
    x - w * 0.2,
    y - h * 0.25,
    Math.min(w, h) * 0.05,
    x - w * 0.1,
    y - h * 0.15,
    Math.min(w, h) * 0.4
  )
  highlight.addColorStop(0, 'rgba(255, 255, 255, 0.7)')
  highlight.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.beginPath()
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
  ctx.fillStyle = highlight
  ctx.fill()

  ctx.shadowColor = 'transparent'
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)'
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
  ctx.stroke()
}
