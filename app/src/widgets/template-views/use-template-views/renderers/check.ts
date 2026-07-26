export function renderCheckmark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.shadowColor = 'transparent'
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.lineWidth = 2
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
  ctx.shadowBlur = 2

  const s = size * 0.3
  ctx.beginPath()
  ctx.moveTo(x - s * 0.35, y + s * 0.05)
  ctx.lineTo(x - s * 0.1, y + s * 0.35)
  ctx.lineTo(x + s * 0.4, y - s * 0.3)
  ctx.stroke()
}
