import type { Template, Project } from 'core/collections'
import { getMaterials } from 'api/utils'
import { delay, parseErrorMessage } from 'shared/utils'
import { NEW_PROJECT_TITLE } from 'shared/constants'
import type { ISupportedLocale } from 'shared/i18n'

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
  private static readonly STORAGE_KEY = 'bead-loop-projects'

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

  private getLangFromStorage(): ISupportedLocale {
    const lang = localStorage.getItem('lang')
    return lang ? (lang as ISupportedLocale) : 'en'
  }

  private getProjectsFromStorage(): Project[] {
    console.debug('LS: get projects')
    if (typeof window === 'undefined') return []

    try {
      const data = localStorage.getItem(ProjectManager.STORAGE_KEY)
      return data ? this.toDto(JSON.parse(data) as ProjectRes[]) : []
    } catch (error) {
      console.error(error)
      const errorMessage = parseErrorMessage(error)
      throw new Error(`LS: get projects failed ${errorMessage}`)
    }
  }

  private saveProjectsToStorage(projects: Project[]): void {
    console.debug('LS: save projects')
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(ProjectManager.STORAGE_KEY, JSON.stringify(projects))
    } catch (error) {
      console.error(error)
      const errorMessage = parseErrorMessage(error)
      throw new Error(`LS: save projects failed ${errorMessage}`)
    }
  }

  async getById(id: string): Promise<Project> {
    console.debug(`DB: Fetch project with id ${id}`)
    await delay()

    const res = this.getProjectsFromStorage() || []
    const project = res.find(project => project.id === id)
    if (!project) throw new Error(`Project with id ${id} not found`)

    return project
  }

  async getByUser(): Promise<Project[]> {
    console.debug(`DB: Fetch user projects`)
    await delay()

    return this.getProjectsFromStorage() || []
  }

  async createProject({
    template
  }: CreateProjectArgs): Promise<Project | undefined> {
    console.debug(`DB: Create new project with templateId ${template.id}`)
    await delay()

    const schema = template.schema.map(row =>
      row.map(color => ({ color, isBeaded: false }))
    )
    const materials = getMaterials(schema, template.type)
    if (!materials.length) return

    const newId = crypto.randomUUID()
    const lang = this.getLangFromStorage()
    const projectInput = [
      {
        id: newId,
        title: `${NEW_PROJECT_TITLE[lang] || 'New Project'} – ${template.title}`,
        type: template.type,
        schema,
        materials,
        progress: 0
      },
      ...(this.getProjectsFromStorage() || [])
    ]
    this.saveProjectsToStorage(projectInput)

    const res = this.getProjectsFromStorage() || []
    const project = res.find(project => project.id === newId)
    if (!project) throw new Error('Project not created')

    return project
  }

  async updateProject({ id, ...data }: UpdateProjectArgs): Promise<Project> {
    console.debug(`DB: Update project with id ${id}`)
    await delay()

    const projects = this.getProjectsFromStorage() || []
    const projectsInput = projects.map(project => {
      if (project.id !== id) return project
      return {
        id,
        ...data
      }
    })
    this.saveProjectsToStorage(projectsInput)

    const res = this.getProjectsFromStorage() || []
    const project = res.find(project => project.id === id)
    if (!project) throw new Error(`Project with id ${id} not updated`)

    return project
  }

  async deleteProjects({ ids }: DeleteProjectArgs): Promise<void> {
    console.debug(`DB: Delete projects ${JSON.stringify(ids)}`)
    await delay()

    const res = this.getProjectsFromStorage() || []
    this.saveProjectsToStorage([
      ...res.filter(project => !ids.includes(project.id))
    ])
  }
}
