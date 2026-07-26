import { describe, it, expect } from 'vitest'
import type { Project } from 'core/collections'
import { getMaterials, getProgress } from './utils'

describe('getMaterials', () => {
  it('should count colors correctly for loom schema', () => {
    const schema: Project['schema'] = [
      [
        { color: '#FF0000', isBeaded: false },
        { color: '#00FF00', isBeaded: false }
      ],
      [
        { color: '#FF0000', isBeaded: false },
        { color: '#0000FF', isBeaded: false }
      ]
    ]
    const type: Project['type'] = 'loom'

    const result = getMaterials(schema, type)

    expect(result).toEqual([
      { color: '#FF0000', count: 2 },
      { color: '#00FF00', count: 1 },
      { color: '#0000FF', count: 1 }
    ])
  })

  it('should count colors correctly for cross schema', () => {
    const schema: Project['schema'] = [
      [
        { color: '#FF0000', isBeaded: false },
        { color: '#00FF00', isBeaded: false },
        { color: '#0000FF', isBeaded: false }
      ],
      [
        { color: '#FF0000', isBeaded: false },
        { color: '#00FF00', isBeaded: false },
        { color: '#0000FF', isBeaded: false }
      ],
      [
        { color: '#FF0000', isBeaded: false },
        { color: '#00FF00', isBeaded: false },
        { color: '#0000FF', isBeaded: false }
      ]
    ]
    const type: Project['type'] = 'cross'

    const result = getMaterials(schema, type)

    expect(result).toEqual([
      { color: '#FF0000', count: 3 },
      { color: '#00FF00', count: 3 },
      { color: '#0000FF', count: 1 }
    ])
  })

  it('should ignore empty colors', () => {
    const schema: Project['schema'] = [
      [
        { color: '#FF0000', isBeaded: false },
        { color: '', isBeaded: false }
      ],
      [
        { color: '#FF0000', isBeaded: false },
        { color: '', isBeaded: false }
      ]
    ]
    const type: Project['type'] = 'loom'

    const result = getMaterials(schema, type)

    expect(result).toEqual([{ color: '#FF0000', count: 2 }])
  })

  it('should return empty array for empty schema', () => {
    const schema: Project['schema'] = []
    const type: Project['type'] = 'loom'

    const result = getMaterials(schema, type)

    expect(result).toEqual([])
  })

  it('should sort colors by count descending', () => {
    const schema: Project['schema'] = [
      [
        { color: '#FF0000', isBeaded: false },
        { color: '#FF0000', isBeaded: false }
      ],
      [
        { color: '#00FF00', isBeaded: false },
        { color: '#0000FF', isBeaded: false }
      ]
    ]
    const type: Project['type'] = 'loom'

    const result = getMaterials(schema, type)

    expect(result[0].count).toBe(2)
    expect(result[1].count).toBe(1)
    expect(result[2].count).toBe(1)
  })
})

describe('getProgress', () => {
  it('should calculate progress correctly', () => {
    const schema: Project['schema'] = [
      [
        { color: '#FF0000', isBeaded: true },
        { color: '#00FF00', isBeaded: false }
      ],
      [
        { color: '#FF0000', isBeaded: true },
        { color: '#0000FF', isBeaded: false }
      ]
    ]
    const type: Project['type'] = 'loom'
    const result = getProgress(schema, type)

    expect(result).toBe(50)
  })

  it('should return 0 when no beads are beaded', () => {
    const schema: Project['schema'] = [
      [
        { color: '#FF0000', isBeaded: false },
        { color: '#00FF00', isBeaded: false }
      ],
      [
        { color: '#FF0000', isBeaded: false },
        { color: '#0000FF', isBeaded: false }
      ]
    ]
    const type: Project['type'] = 'loom'

    const result = getProgress(schema, type)

    expect(result).toBe(0)
  })

  it('should return 100 when all beads are beaded', () => {
    const schema: Project['schema'] = [
      [
        { color: '#FF0000', isBeaded: true },
        { color: '#00FF00', isBeaded: true }
      ],
      [
        { color: '#FF0000', isBeaded: true },
        { color: '#0000FF', isBeaded: true }
      ]
    ]
    const type: Project['type'] = 'loom'

    const result = getProgress(schema, type)

    expect(result).toBe(100)
  })

  it('should handle cross schema correctly', () => {
    const schema: Project['schema'] = [
      [
        { color: '#FF0000', isBeaded: true },
        { color: '#00FF00', isBeaded: true },
        { color: '#0000FF', isBeaded: false }
      ],
      [
        { color: '#FF0000', isBeaded: false },
        { color: '#00FF00', isBeaded: true },
        { color: '#0000FF', isBeaded: false }
      ],
      [
        { color: '#FF0000', isBeaded: true },
        { color: '#00FF00', isBeaded: false },
        { color: '#0000FF', isBeaded: false }
      ]
    ]
    const type: Project['type'] = 'cross'

    const result = getProgress(schema, type)

    expect(result).toBe(57)
  })

  it('should handle empty schema', () => {
    const schema: Project['schema'] = []
    const type: Project['type'] = 'loom'

    const result = getProgress(schema, type)

    expect(result).toBe(0)
  })
})
