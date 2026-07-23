import { executor } from 'middleware'
import {
  type DeleteTemplateArgs,
  TemplateManager
} from 'core/managers/template'

type Req = DeleteTemplateArgs
type Res = Promise<void>

async function handler({ ids }: Req): Res {
  const templates = new TemplateManager()
  await templates.deleteTemplates({ ids })
}

export async function deleteTemplates(args: Req) {
  return await executor<Req, Res>('actions/templates/delete', handler, args)
}
