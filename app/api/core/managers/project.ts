import type { Template, Project } from 'core/collections'
import { getMaterials } from 'api/utils'

type ProjectRes = {
  id: Project['id']
  title: Project['title']
  type: Project['type']
  schema: Project['schema']
  materials: Project['materials']
  progress: Project['progress']
}

export type CreateProjectArgs = {
  template: Template
}
export type UpdateProjectArgs = Pick<
  Project,
  'id' | 'title' | 'type' | 'schema' | 'materials' | 'progress'
>
export type DeleteProjectArgs = {
  ids: Project['id'][]
}

export class ProjectManager {
  toDto(res: ProjectRes[]): Project[] {
    return res.map(project => ({
      id: project.id,
      title: project.title,
      type: project.type,
      schema: project.schema as unknown as Project['schema'],
      materials: project.materials as unknown as Project['materials'],
      progress: project.progress
    }))
  }

  async getById(id: string): Promise<Project> {
    console.debug(`DB: Fetch project with id ${id}`)

    // TODO getById from localStorage
    // const res = await db.select().from(pgProjects).where(eq(pgProjects.id, id))
    const res: ProjectRes[] = []

    const project = this.toDto(res)?.[0]
    if (!project) throw new Error(`Project with id ${id} not found`)

    return project
  }

  async getByUser(): Promise<Project[]> {
    console.debug(`DB: Fetch user projects`)

    // TODO getByUser from localStorage
    // const res = await db
    //   .select()
    //   .from(pgProjects)
    //   .where(eq(pgProjects.userId, this.userId))
    const res: ProjectRes[] = []
    return this.toDto(res)
  }

  async createProject({
    template
  }: CreateProjectArgs): Promise<Project | undefined> {
    console.debug(`DB: Create new project with templateId ${template.id}`)

    const schema = template.schema.map(row =>
      row.map(color => ({ color, isBeaded: false }))
    )
    const materials = getMaterials(schema)
    if (!materials.length) return

    // TODO createProject in localStorage
    // const res = await db
    //   .insert(pgProjects)
    //   .values({
    //     title: 'New Project',
    //     userId: this.userId,
    //     userName: this.userName,
    //     type: template.type,
    //     // TODO toJSON
    //     schema: JSON.parse(JSON.stringify(schema)),
    //     materials: JSON.parse(JSON.stringify(materials)),
    //     progress: 0
    //   })
    //   .returning()
    const res: ProjectRes[] = []

    const project = this.toDto(res)?.[0]
    if (!project) throw new Error('Project not created')

    return project
  }

  async updateProject({ id, ...data }: UpdateProjectArgs): Promise<Project> {
    console.debug(`DB: Update project with id ${id}`)

    // TODO updateProject in localStorage
    // const res = await db
    //   .update(pgProjects)
    //   .set({
    //     ...data,
    //     // TODO toJSON
    //     schema: JSON.parse(JSON.stringify(data.schema)),
    //     materials: JSON.parse(JSON.stringify(data.materials))
    //   })
    //   .where(and(eq(pgProjects.id, id), eq(pgProjects.userId, this.userId)))
    //   .returning()
    const res: ProjectRes[] = []

    const project = this.toDto(res)?.[0]
    if (!project) throw new Error(`Project with id ${id} not updated`)

    return project
  }

  async deleteProjects({ ids }: DeleteProjectArgs): Promise<void> {
    console.debug(`DB: Delete projects ${JSON.stringify(ids)}`)

    // TODO deleteProjects in localStorage
    // await db.delete(pgProjects).where(inArray(pgProjects.id, ids))
  }
}
