export type SchemaType = 'loom' | 'cross' | 'peyote'
// TODO: add views
// | 'diamond'
// | 'detailed'
// | 'flower'

export interface Template {
  id: string
  title: string
  type: SchemaType
  schema: string[][]
  isPublished: boolean
}
