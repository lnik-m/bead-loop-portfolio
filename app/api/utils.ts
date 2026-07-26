import type { Project } from './core/collections'

export const getMaterials = (
  schema: Project['schema'],
  type: Project['type']
): Project['materials'] => {
  let colors: Record<string, number> = {}
  let normalizedSchema = [...schema]
  if (type === 'cross') {
    normalizedSchema = schema.map((row, i) =>
      i % 2 === 0 ? row.slice(0, -1) : row
    )
  }
  normalizedSchema.flat().forEach(({ color }) => {
    colors[color] = color in colors ? colors[color] + 1 : 1
  })
  delete colors['']
  return Object.keys(colors)
    .map(color => ({
      color,
      count: colors[color]
    }))
    .sort((a, b) => b.count - a.count)
}

export const getProgress = (
  schema: Project['schema'],
  type: Project['type']
): number => {
  const materials = getMaterials(schema, type)
  const total = materials.reduce((sum, { count }) => sum + count, 0)

  if (!schema?.length || total === 0) return 0

  const beaded = schema.flat().filter(({ isBeaded }) => isBeaded).length

  return Math.floor((beaded / total) * 100)
}
