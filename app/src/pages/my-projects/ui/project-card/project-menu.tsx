import { IconDots, IconTrash } from '@tabler/icons-react'

import { useState } from 'react'
import { ActionIcon, Menu, Modal } from '@mantine/core'
import { useClickOutside, useDisclosure } from '@mantine/hooks'
import type { Project } from 'core/collections'
import { useI18n } from 'features/i18n'
import { DeleteModal } from './delete-modal'

interface Props {
  projectId: Project['id']
}

export const ProjectMenu = ({ projectId }: Props) => {
  const { localize } = useI18n()

  const [opened, setOpened] = useState(false)
  const ref = useClickOutside(() => setOpened(false))

  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false)
  return (
    <>
      <Modal
        opened={isModalOpened}
        onClose={closeModal}
        title={localize('dashboard.projects.deleteModal.title')}
      >
        <DeleteModal projectId={projectId} closeAction={closeModal} />
      </Modal>

      <div ref={ref}>
        <Menu
          shadow="md"
          width={200}
          opened={opened}
          position="bottom-end"
          offset={0}
          withArrow
        >
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="#bfbaba"
              onClick={event => {
                event.preventDefault()
                setOpened(!opened)
              }}
            >
              <IconDots
                size={24}
                className="stroke-beadLoop-dark dark:stroke-beadLoop-blueLight"
              />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown className="max-w-fit">
            <Menu.Item
              onClick={event => {
                event.preventDefault()
                openModal()
              }}
              color="red"
              leftSection={<IconTrash size={14} />}
            >
              {localize('dashboard.projects.buttons.delete')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  )
}
