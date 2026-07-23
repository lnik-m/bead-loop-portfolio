import { executor } from 'middleware'
import { ProjectManager } from 'core/managers/project'
import type { Project } from 'core/collections'

type Req = void
type Res = Promise<Project[]>

async function handler(): Res {
  const projects = new ProjectManager()
  return await projects.getByUser()
}

export async function getProjectsByUser(args: Req) {
  return await executor<Req, Res>('actions/projects/get/by-user', handler, args)
}
