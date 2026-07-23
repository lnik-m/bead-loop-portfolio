import type { Project } from 'core/collections'
import { useI18n } from 'features/i18n'
import { useProjects } from 'features/projects'
import { Button, Flex } from 'shared/ui'

interface Props {
  projectId: Project['id']
  closeAction: () => void
}

export const DeleteModal = ({ projectId, closeAction }: Props) => {
  const { localize } = useI18n()
  const { deleteProject } = useProjects()
  return (
    <Flex column isGap className="gap-12">
      {localize('projects.deleteModal.confirm')}
      <Flex className="justify-end">
        <Button theme="dark" onClick={closeAction}>
          {localize('projects.buttons.cancel')}
        </Button>
        <Button
          theme="warn"
          onClick={() => {
            deleteProject(projectId)
            closeAction()
          }}
        >
          {localize('projects.buttons.delete')}
        </Button>
      </Flex>
    </Flex>
  )
}
