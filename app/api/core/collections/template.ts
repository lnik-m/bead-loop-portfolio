export type SchemaType = 'loom' | 'cross' | 'peyote'

export interface Template {
  id: string
  title: string
  type: SchemaType
  schema: string[][]
  isPublished: boolean
}
