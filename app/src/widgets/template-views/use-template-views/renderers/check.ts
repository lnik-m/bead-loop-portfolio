export function renderCheckmark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  const s = size * 0.3
  const radius = size * 0.4

  ctx.shadowColor = 'transparent'
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()

  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
  ctx.shadowBlur = 2
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.lineWidth = 2.5
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(x - s * 0.35, y + s * 0.05)
  ctx.lineTo(x - s * 0.1, y + s * 0.35)
  ctx.lineTo(x + s * 0.4, y - s * 0.3)
  ctx.stroke()
}
