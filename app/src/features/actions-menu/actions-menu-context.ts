import { createContext } from 'react'

export interface MenuContextType {
  scale: string
  minScale: string
  maxScale: string
  zoomIn: () => void
  zoomOut: () => void
  rotate: string
  rotateTemplate: () => void
  isMoving: boolean
  move: () => void
}

export const ActionsMenuContext = createContext<MenuContextType | null>(null)
