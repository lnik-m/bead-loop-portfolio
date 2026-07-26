import { IconTrash } from '@tabler/icons-react'

import type { Project } from 'core/collections'
import { useI18n } from 'features/i18n'
import { Button, Flex } from 'shared/ui'
import { useDeleteProject } from './use-delete-project'

interface Props {
  projectId: Project['id']
  closeAction: () => void
}

export const DeleteModal = ({ projectId, closeAction }: Props) => {
  const { localize } = useI18n()
  const { loading, handleDelete } = useDeleteProject({
    projectId,
    closeAction
  })
  return (
    <Flex column isGap className="gap-8">
      <Flex className="items-center justify-between">
        <Flex isGap className="items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-bead-loop-rose/10 flex items-center justify-center">
            <IconTrash className="w-6 h-6 text-bead-loop-rose" stroke={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-bead-loop-purple dark:text-white">
            {localize('projects.deleteModal.title')}
          </h3>
        </Flex>
      </Flex>

      <p className="text-bead-loop-gray dark:text-bead-loop-light-20 text-base leading-relaxed">
        {localize('projects.deleteModal.confirm')}
      </p>

      <Flex className="justify-end">
        <Button theme={'warn'} onClick={closeAction} className="px-4">
          {localize('projects.buttons.cancel')}
        </Button>
        <Button onClick={handleDelete} loading={loading} className="px-8">
          {localize('projects.buttons.delete')}
        </Button>
      </Flex>
    </Flex>
  )
}
