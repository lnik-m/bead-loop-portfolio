import { useCallback } from 'react'
import type { SchemaType } from 'core/collections/template'

export const SIZE_LIMITS = {
  loom: { min: 1, max: 100 },
  peyote: { min: 1, max: 100 },
  cross: { min: 3, max: 101 }
} as const

export const STEP = {
  loom: 1,
  peyote: 1,
  cross: 2
} as const

export function useSchemaNormalization(rows: number, columns: number) {
  const getLimits = useCallback((type: SchemaType) => {
    return SIZE_LIMITS[type] || SIZE_LIMITS.loom
  }, [])

  const normalizeValue = useCallback(
    (v: number, type: SchemaType): number => {
      const { min, max } = getLimits(type)
      let result = Math.max(min, Math.min(max, v))

      if (type === 'cross') {
        result = result % 2 === 0 ? result + 1 : result
      }

      return result
    },
    [getLimits]
  )

  const normalizeForSchemaType = useCallback(
    (type: SchemaType) => {
      const newRows = normalizeValue(rows, type)
      const newCols = normalizeValue(columns, type)

      const updates: { rows?: number; cols?: number } = {}

      if (newRows !== rows) updates.rows = newRows
      if (newCols !== columns) updates.cols = newCols

      return updates
    },
    [rows, columns, normalizeValue]
  )

  const getStep = useCallback((type: SchemaType): number => {
    return STEP[type]
  }, [])

  return {
    normalizeValue,
    normalizeForSchemaType,
    getLimits,
    getStep
  }
}
