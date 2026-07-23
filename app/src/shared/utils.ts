import { scaleRange } from 'shared/constants'

export const getScale = (scaleNumber: number): string => {
  return scaleRange.get(scaleNumber) ?? 'scale-[1]'
}
