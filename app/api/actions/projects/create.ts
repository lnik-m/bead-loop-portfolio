import { executor } from 'middleware'
import { ProjectManager } from 'core/managers/project'
import { TemplateManager } from 'core/managers/template'
import type { Project, Template } from 'core/collections'

type Req = {
  templateId: Template['id']
}
type Res = Promise<Project | undefined>

async function handler({ templateId }: Req): Res {
  const templates = new TemplateManager()
  const template = await templates.getById(templateId)
  if (!template) return
  // TODO add logic with materials & progress
  const projects = new ProjectManager()
  return await projects.createProject({ template })
}

export async function createProject(args: Req) {
  return await executor<Req, Res>('actions/projects/create', handler, args)
}
