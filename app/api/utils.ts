import type { Project } from './core/collections'

export const getMaterials = (
  schema: Project['schema']
): Project['materials'] => {
  let colors: Record<string, number> = {}
  schema.flat().forEach(({ color }) => {
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

export const getProgress = (schema: Project['schema']): number => {
  const materials = getMaterials(schema)
  return Math.floor(
    (schema.flat().filter(({ isBeaded }) => isBeaded).length /
      materials.map(({ count }) => count).reduce((a, b) => a + b)) *
      100
  )
}
