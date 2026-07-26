import {
  IconArrowsMove,
  IconMinus,
  IconPlus,
  IconRotateClockwise2
} from '@tabler/icons-react'

import { useI18n } from 'features/i18n'
import { useActionsMenu } from 'features/actions-menu'
import { Flex, ActionIcon } from 'shared/ui'

export const ActionsMenu = () => {
  const { localize } = useI18n()
  const {
    scale,
    minScale,
    maxScale,
    rotateTemplate,
    zoomIn,
    zoomOut,
    isMoving,
    move
  } = useActionsMenu()
  return (
    <Flex>
      <ActionIcon
        onClick={move}
        isActive={isMoving}
        label={localize('dashboard.move')}
      >
        <IconArrowsMove />
      </ActionIcon>
      <ActionIcon onClick={zoomOut} disabled={scale === minScale}>
        <IconMinus />
      </ActionIcon>
      <ActionIcon onClick={zoomIn} disabled={scale === maxScale}>
        <IconPlus />
      </ActionIcon>
      <ActionIcon onClick={rotateTemplate}>
        <IconRotateClockwise2 />
      </ActionIcon>
    </Flex>
  )
}
