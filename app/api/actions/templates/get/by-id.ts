import { executor } from 'middleware'
import { TemplateManager } from 'core/managers/template'
import type { Template } from 'core/collections'

type Req = {
  id: Template['id']
}
type Res = Promise<Template>

async function handler({ id }: Req): Res {
  const templates = new TemplateManager()
  return await templates.getById(id)
}

export async function getTemplateById(args: Req) {
  return await executor<Req, Res>('actions/templates/get/by-id', handler, args)
}
