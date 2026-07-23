import { scaleRange } from 'shared/constants'

export const getScale = (scaleNumber: number): string => {
  return scaleRange.get(scaleNumber) ?? 'scale-[1]'
}

const DELAY_MS = 1500
export const delay = (ms: number = DELAY_MS): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
