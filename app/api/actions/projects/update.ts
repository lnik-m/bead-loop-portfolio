import { executor } from 'middleware'
import { ProjectManager, type UpdateProjectArgs } from 'core/managers/project'
import type { Project } from 'core/collections'

type Req = UpdateProjectArgs
type Res = Promise<Project>

async function handler(data: Req): Res {
  const projects = new ProjectManager()
  // TODO add logic with materials & progress
  return await projects.updateProject(data)
}

export async function updateProject(args: Req) {
  return await executor<Req, Res>('actions/projects/update', handler, args)
}
