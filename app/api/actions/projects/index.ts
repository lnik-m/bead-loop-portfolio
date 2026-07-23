import { getProjectsByUser } from './get/by-user'
import { getProjectById } from './get/by-id'
import { createProject } from './create'
import { updateProject } from './update'
import { deleteProjects } from './delete'

export const projectActions = {
  get: {
    byUser: getProjectsByUser,
    byId: getProjectById
  },
  add: createProject,
  update: updateProject,
  delete: deleteProjects
}
