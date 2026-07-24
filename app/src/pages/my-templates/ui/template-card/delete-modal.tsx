import type { Template } from 'core/collections'
import { useI18n } from 'features/i18n'
import { useMyTemplates } from 'features/my-templates'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Flex } from 'shared/ui'
import { UNEXPECTED_ERROR } from 'shared/constants'

interface Props {
  templateId: Template['id']
  closeAction: () => void
}

export const DeleteModal = ({ templateId, closeAction }: Props) => {
  const { localize } = useI18n()
  const { deleteTemplate } = useMyTemplates()

  const [loading, setLoading] = useState<boolean>(false)
  const handleDelete = useCallback(async () => {
    setLoading(true)
    try {
      await deleteTemplate(templateId)
      closeAction()
      toast.success(localize('myTemplates.deleteModal.toast.success'))
    } catch (error) {
      console.error(error)
      const errorMessage =
        error instanceof Error ? error.message : UNEXPECTED_ERROR
      toast.error(
        `${localize('myTemplates.deleteModal.toast.error')}. ${errorMessage}`
      )
    } finally {
      setLoading(false)
    }
  }, [templateId, deleteTemplate, closeAction])

  return (
    <Flex column isGap className="gap-12">
      {localize('myTemplates.deleteModal.confirm')}
      <Flex className="justify-end">
        <Button theme="dark" onClick={closeAction}>
          {localize('myTemplates.buttons.cancel')}
        </Button>
        <Button theme="warn" onClick={handleDelete} loading={loading}>
          {localize('myTemplates.buttons.delete')}
        </Button>
      </Flex>
    </Flex>
  )
}
