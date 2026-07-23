export type SchemaType =
  | 'loom'
  | 'cross'
  | 'peyote'
  | 'diamond'
  | 'detailed'
  | 'flower'

export interface Template {
  id: string
  title: string
  type: SchemaType
  schema: string[][]
  isPublished: boolean
}
