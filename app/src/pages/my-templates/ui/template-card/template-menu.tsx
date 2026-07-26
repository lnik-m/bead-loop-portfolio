import {
  IconDots,
  IconPencil,
  IconPlayerPlay,
  IconTrash
} from '@tabler/icons-react'

import { useState } from 'react'
import { Link } from 'react-router'
import { ActionIcon, Menu, Modal } from '@mantine/core'
import { useClickOutside, useDisclosure } from '@mantine/hooks'
import type { Template } from 'core/collections'
import { routes } from 'app/routes'
import { useI18n } from 'features/i18n'
import { useProjects } from 'features/projects'
import { DeleteModal } from './delete-modal'

interface Props {
  templateId: Template['id']
}

export const TemplateMenu = ({ templateId }: Props) => {
  const { localize } = useI18n()

  const [opened, setOpened] = useState(false)
  const ref = useClickOutside(() => setOpened(false))

  const { addProject } = useProjects()

  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false)
  return (
    <>
      <Modal
        opened={isModalOpened}
        onClose={closeModal}
        withCloseButton={false}
      >
        <DeleteModal templateId={templateId} closeAction={closeModal} />
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
                className="stroke-bead-loop-dark dark:stroke-bead-loop-blue-light"
              />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown className="max-w-fit">
            <Menu.Item
              component={Link}
              to={`${routes.editTemplate}${templateId}`}
              leftSection={<IconPencil size={14} />}
            >
              {localize('myTemplates.buttons.edit')}
            </Menu.Item>
            <Menu.Item
              onClick={event => {
                event.preventDefault()
                addProject(templateId)
              }}
              leftSection={<IconPlayerPlay size={14} />}
            >
              {localize('myTemplates.buttons.bead')}
            </Menu.Item>
            <Menu.Item
              onClick={event => {
                event.preventDefault()
                openModal()
              }}
              color="red"
              leftSection={<IconTrash size={14} />}
            >
              {localize('myTemplates.buttons.delete')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  )
}
