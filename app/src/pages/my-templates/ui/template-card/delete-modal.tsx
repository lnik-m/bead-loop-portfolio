import type { Template } from 'core/collections'
import { useI18n } from 'features/i18n'
import { useMyTemplates } from 'features/my-templates'
import { Button, Flex } from 'shared/ui'

interface Props {
  templateId: Template['id']
  closeAction: () => void
}

export const DeleteModal = ({ templateId, closeAction }: Props) => {
  const { localize } = useI18n()
  const { deleteTemplate } = useMyTemplates()
  return (
    <Flex column isGap className="gap-12">
      {localize('dashboard.myTemplates.deleteModal.confirm')}
      <Flex className="justify-end">
        <Button theme="dark" onClick={closeAction}>
          {localize('dashboard.myTemplates.buttons.cancel')}
        </Button>
        <Button
          theme="warn"
          onClick={() => {
            deleteTemplate(templateId)
            closeAction()
          }}
        >
          {localize('dashboard.myTemplates.buttons.delete')}
        </Button>
      </Flex>
    </Flex>
  )
}
