import { useCallback, type RefObject } from 'react'
import type { TemplateType, CellPosition } from './types'

export function useClickHandler(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  rows: number,
  cols: number,
  cellSize: number,
  gap: number,
  type: TemplateType,
  getPosition: (
    row: number,
    col: number,
    cellSize: number,
    gap: number
  ) => CellPosition,
  onClick?: (rows: number, columns: number) => void,
  setDrawTrigger?: React.Dispatch<React.SetStateAction<number>>
) {
  return useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!onClick) return

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const mouseX = (e.clientX - rect.left) * scaleX
      const mouseY = (e.clientY - rect.top) * scaleY

      if (type === 'peyote' || type === 'cross') {
        for (let row = 0; row < rows; row++) {
          const isOddRow = row % 2 !== 0
          const maxCols = type === 'cross' && !isOddRow ? cols - 1 : cols

          for (let col = 0; col < maxCols; col++) {
            const pos = getPosition(row, col, cellSize, gap)
            const radius = Math.min(pos.width, pos.height) / 2
            const dist = Math.sqrt(
              (mouseX - pos.x) ** 2 + (mouseY - pos.y) ** 2
            )

            if (dist < radius) {
              onClick(row, col)
              setDrawTrigger?.(prev => prev + 1)
              return
            }
          }
        }
        return
      }

      const col = Math.floor(mouseX / (cellSize + gap))
      const row = Math.floor(mouseY / (cellSize + gap))

      const xInCell = mouseX - col * (cellSize + gap)
      const yInCell = mouseY - row * (cellSize + gap)

      const isInsideX = xInCell < cellSize
      const isInsideY = yInCell < cellSize

      if (row < rows && col < cols && isInsideX && isInsideY) {
        onClick(row, col)
        setDrawTrigger?.(prev => prev + 1)
      }
    },
    [
      onClick,
      rows,
      cols,
      cellSize,
      gap,
      type,
      getPosition,
      canvasRef,
      setDrawTrigger
    ]
  )
}
