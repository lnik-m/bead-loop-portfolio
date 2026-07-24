import {
  IconArrowsMove,
  IconMinus,
  IconPlus,
  IconRotateClockwise2
} from '@tabler/icons-react'

import { useActionsMenu } from 'features/actions-menu'
import { Flex, ActionIcon } from 'shared/ui'

export const ActionsMenu = () => {
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
      {/*TODO import { useDrag } from '@mantine/hooks';*/}
      <ActionIcon onClick={move} isActive={isMoving} label={'Move template'}>
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
