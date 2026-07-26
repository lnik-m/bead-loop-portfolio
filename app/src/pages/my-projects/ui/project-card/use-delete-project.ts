import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import type { Project } from 'core/collections'
import { useI18n } from 'features/i18n'
import { useProjects } from 'features/projects'
import { parseErrorMessage } from 'shared/utils'

interface Props {
  projectId: Project['id']
  closeAction: () => void
}

export const useDeleteProject = ({ projectId, closeAction }: Props) => {
  const { localize } = useI18n()
  const { deleteProject } = useProjects()

  const [loading, setLoading] = useState<boolean>(false)

  const handleDelete = useCallback(async () => {
    setLoading(true)
    try {
      await deleteProject(projectId)
      closeAction()
      toast.success(localize('projects.deleteModal.toast.success'))
    } catch (error) {
      console.error(error)
      const errorMessage = parseErrorMessage(error)
      toast.error(
        `${localize('projects.deleteModal.toast.error')}. ${errorMessage}`
      )
    } finally {
      setLoading(false)
    }
  }, [projectId, deleteProject, closeAction])

  return { loading, handleDelete }
}
