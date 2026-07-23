import { executor } from 'middleware'
import { type DeleteProjectArgs, ProjectManager } from 'core/managers/project'

type Req = DeleteProjectArgs
type Res = Promise<void>

async function handler({ ids }: Req): Res {
  const projects = new ProjectManager()
  await projects.deleteProjects({ ids })
}

export async function deleteProjects(args: Req) {
  return await executor<Req, Res>('actions/projects/delete', handler, args)
}
