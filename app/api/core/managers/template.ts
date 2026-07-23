import type { Template } from 'core/collections'
import type { SchemaType } from '../collections/template'
import { UNEXPECTED_ERROR } from 'shared/constants'
import { delay } from 'shared/utils'

type TemplateRes = {
  id: Template['id']
  title: Template['title']
  type: Template['type']
  schema: Template['schema']
  isPublished: Template['isPublished']
}

export type CreateTemplateArgs = Pick<Template, 'title' | 'type' | 'schema'>
export type UpdateTemplateArgs = Pick<
  Template,
  'id' | 'title' | 'type' | 'schema'
>
export type DeleteTemplateArgs = {
  ids: Template['id'][]
}

const NEW_TEMPLATE = {
  id: '',
  title: 'New template',
  type: 'loom' as SchemaType,
  schema: [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  isPublished: false
}

export class TemplateManager {
  private static readonly STORAGE_KEY = 'bead-loop-templates'

  toDto(res: TemplateRes[]): Template[] {
    return res.map(template => ({
      id: template.id,
      title: template.title,
      type: template.type,
      schema: (Array.isArray(template.schema)
        ? template.schema
        : [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ]) as string[][],
      isPublished: template.isPublished
    }))
  }

  private getTemplatesFromStorage(): Template[] {
    console.debug('LS: get templates')
    if (typeof window === 'undefined') return []

    try {
      const data = localStorage.getItem(TemplateManager.STORAGE_KEY)
      return data ? this.toDto(JSON.parse(data)) : []
    } catch (error) {
      console.error(error)
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR
      throw new Error(`LS: get templates failed ${errorMessage}`)
    }
  }

  private saveTemplatesToStorage(templates: Template[]): void {
    console.debug('LS: save templates')
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(
        TemplateManager.STORAGE_KEY,
        JSON.stringify(templates)
      )
    } catch (error) {
      console.error(error)
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR
      throw new Error(`LS: save templates failed ${errorMessage}`)
    }
  }

  async getById(id: string): Promise<Template> {
    console.debug(`DB: Fetch template with id ${id}`)
    await delay()

    if (id === 'new') return NEW_TEMPLATE

    const res = this.getTemplatesFromStorage() || []
    const template = res.find(template => template.id === id)
    if (!template) throw new Error(`Template with id ${id} not found`)

    return template
  }

  async getByUser(): Promise<Template[]> {
    console.debug(`DB: Fetch user templates`)
    await delay()

    return this.getTemplatesFromStorage() || []
  }

  async createTemplate(data: CreateTemplateArgs): Promise<Template> {
    console.debug(`DB: Create new template`)
    await delay()

    const newId = crypto.randomUUID()
    const templateInput = [
      ...(this.getTemplatesFromStorage() || []),
      {
        ...data,
        id: newId,
        schema: NEW_TEMPLATE['schema'],
        isPublished: NEW_TEMPLATE['isPublished']
      }
    ]
    this.saveTemplatesToStorage(templateInput)

    const res = this.getTemplatesFromStorage() || []
    const template = res.find(template => template.id === newId)
    if (!template) throw new Error('Template not created')

    return template
  }

  async updateTemplate({ id, ...data }: UpdateTemplateArgs): Promise<Template> {
    console.debug(`DB: Update template with id ${id}`)
    await delay()

    const templates = this.getTemplatesFromStorage() || []
    const templateInput = templates.map(template => {
      if (template.id !== id) return template
      return {
        ...template,
        ...data
      }
    })
    this.saveTemplatesToStorage(templateInput)

    const res = this.getTemplatesFromStorage() || []
    const template = res.find(template => template.id === id)
    if (!template) throw new Error(`Template with id ${id} not updated`)

    return template
  }

  async deleteTemplates({ ids }: DeleteTemplateArgs): Promise<void> {
    console.debug(`DB: Delete templates ${JSON.stringify(ids)}`)
    await delay()

    const templates = this.getTemplatesFromStorage() || []
    const templateInput = templates.filter(
      template => !ids.includes(template.id)
    )
    this.saveTemplatesToStorage(templateInput)
  }
}
