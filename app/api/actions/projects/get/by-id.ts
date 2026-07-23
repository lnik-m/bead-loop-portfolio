import { executor } from 'middleware'
import { ProjectManager } from 'core/managers/project'
import type { Project } from 'core/collections'

type Req = {
  id: Project['id']
}
type Res = Promise<Project>

async function handler({ id }: Req): Res {
  const projects = new ProjectManager()
  return await projects.getById(id)
}

export async function getProjectById(args: Req) {
  return await executor<Req, Res>('actions/projects/get/by-id', handler, args)
}
