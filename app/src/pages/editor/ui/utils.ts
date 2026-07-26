import type { Template } from 'core/collections'
import type { Mode } from 'features/editor'

interface GetNewSchemaArgs {
  schema: Template['schema']
  isEraser: boolean
  currentColor: string
  mode: Mode
  row: number
  column: number
}

export const getNewSchema = ({
  schema,
  column,
  row,
  mode,
  currentColor,
  isEraser
}: GetNewSchemaArgs) => {
  const newSchema = [...schema.map(row => [...row])]
  const fillColor = isEraser ? '' : currentColor

  switch (mode) {
    case 'default': {
      newSchema[row][column] = fillColor
      break
    }

    case 'byRow': {
      if (row < 0 || row >= newSchema.length) return
      newSchema[row] = newSchema[row].map(() => fillColor)
      break
    }

    case 'byColumn': {
      if (column < 0 || column >= (newSchema[0]?.length || 0)) return
      for (let i = 0; i < newSchema.length; i++) {
        newSchema[i][column] = fillColor
      }
      break
    }

    case 'byColor': {
      const targetColor = schema[row][column]
      const newColor = isEraser ? '' : currentColor
      let changed = 0
      for (let i = 0; i < newSchema.length; i++) {
        for (let j = 0; j < newSchema[i].length; j++) {
          if (newSchema[i][j] === targetColor) {
            newSchema[i][j] = newColor
            changed++
          }
        }
      }
      if (changed === 0) return
      break
    }
  }
  return newSchema
}
