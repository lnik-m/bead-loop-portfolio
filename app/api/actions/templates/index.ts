import { getTemplatesByUser } from './get/by-user'
import { getFeedTemplates } from './get/feed'
import { getTemplateById } from './get/by-id'
import { createTemplate } from './create'
import { updateTemplate } from './update'
import { deleteTemplates } from './delete'

export const templateActions = {
  get: {
    byUser: getTemplatesByUser,
    feed: getFeedTemplates,
    byId: getTemplateById
  },
  add: createTemplate,
  update: updateTemplate,
  delete: deleteTemplates
}
