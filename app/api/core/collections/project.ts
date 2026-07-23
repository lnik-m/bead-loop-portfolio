import type { Template } from './template'

interface Bead {
  color: string
  isBeaded: boolean
}

interface BeadCount {
  color: string
  count: number
}

export interface Project {
  id: string
  title: string
  type: Template['type']
  schema: Bead[][]
  materials: BeadCount[]
  progress: number
}
