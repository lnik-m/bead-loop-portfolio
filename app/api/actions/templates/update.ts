import { executor } from 'middleware'
import {
  TemplateManager,
  type UpdateTemplateArgs
} from 'core/managers/template'
import { type Template } from 'core/collections'

type Req = UpdateTemplateArgs
type Res = Promise<Template>

async function handler(data: Req): Res {
  const templates = new TemplateManager()
  return await templates.updateTemplate(data)
}

export async function updateTemplate(args: Req) {
  return await executor<Req, Res>('actions/templates/update', handler, args)
}
