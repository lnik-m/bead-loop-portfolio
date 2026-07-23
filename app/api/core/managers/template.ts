import type { Template } from 'core/collections'
import type { SchemaType } from '../collections/template'

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

  async getById(id: string): Promise<Template> {
    console.debug(`DB: Fetch template with id ${id}`)
    // TODO getById from localStorage
    // const res = await db
    //   .select()
    //   .from(pgTemplates)
    //   .where(eq(pgTemplates.id, id))
    const res: TemplateRes[] = id === 'new' ? [NEW_TEMPLATE] : []

    const template = this.toDto(res)?.[0]
    if (!template) throw new Error(`Template with id ${id} not found`)

    return template
  }

  async getByUser(): Promise<Template[]> {
    console.debug(`DB: Fetch user templates`)

    // TODO getByUser from localStorage
    // const res = await db
    //   .select()
    //   .from(pgTemplates)
    //   .where(eq(pgTemplates.userId, this.userId))
    const res: TemplateRes[] = []
    return this.toDto(res)
  }

  async getFeed(): Promise<Template[]> {
    console.debug(`DB: Fetch feed templates`)

    // TODO getFeed from localStorage
    // const res = await db
    //   .select()
    //   .from(pgTemplates)
    //   .where(
    //     and(
    //       ne(pgTemplates.userId, this.userId),
    //       eq(pgTemplates.isPublished, true)
    //     )
    //   )
    const res: TemplateRes[] = []
    return this.toDto(res)
  }

  async createTemplate(data: CreateTemplateArgs): Promise<Template> {
    console.debug(`DB: Create new template`)

    // TODO createTemplate from localStorage
    // const res = await db
    //   .insert(pgTemplates)
    //   .values({
    //     userId: this.userId,
    //     userName: this.userName,
    //     ...data
    //   })
    //   .returning()
    const res: TemplateRes[] = []

    const template = this.toDto(res)?.[0]
    if (!template) throw new Error('Template not created')

    return template
  }

  async updateTemplate({ id, ...data }: UpdateTemplateArgs): Promise<Template> {
    console.debug(`DB: Update template with id ${id}`)

    // TODO updateTemplate from localStorage
    // const res = await db
    //   .update(pgTemplates)
    //   .set(data)
    //   .where(and(eq(pgTemplates.id, id), eq(pgTemplates.userId, this.userId)))
    //   .returning()
    const res: TemplateRes[] = []

    const template = this.toDto(res)?.[0]
    if (!template) throw new Error(`Template with id ${id} not updated`)

    return template
  }

  async deleteTemplates({ ids }: DeleteTemplateArgs): Promise<void> {
    console.debug(`DB: Delete templates ${JSON.stringify(ids)}`)

    // TODO deleteTemplates from localStorage
    // await db.delete(pgTemplates).where(inArray(pgTemplates.id, ids))
  }
}
