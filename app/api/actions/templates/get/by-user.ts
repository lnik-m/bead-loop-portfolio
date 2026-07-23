import { executor } from 'middleware'
import { TemplateManager } from 'core/managers/template'
import type { Template } from 'core/collections'

type Req = void
type Res = Promise<Template[]>

async function handler(): Res {
  const templates = new TemplateManager()
  return await templates.getByUser()
}

export async function getTemplatesByUser(args: Req) {
  return await executor<Req, Res>(
    'actions/templates/get/by-user',
    handler,
    args
  )
}
