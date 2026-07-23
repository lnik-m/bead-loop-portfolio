import { executor } from 'middleware'
import {
  type CreateTemplateArgs,
  TemplateManager
} from 'core/managers/template'
import { type Template } from 'core/collections'

type Req = CreateTemplateArgs
type Res = Promise<Template>

async function handler(data: Req): Res {
  const templates = new TemplateManager()
  return await templates.createTemplate(data)
}

export async function createTemplate(args: Req) {
  return await executor<Req, Res>('actions/templates/create', handler, args)
}
