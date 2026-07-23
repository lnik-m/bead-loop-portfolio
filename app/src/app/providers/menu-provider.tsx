import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { ActionsMenuContext } from 'features/actions-menu'
import { getScale } from 'shared/utils'

export function MenuProvider({ children }: PropsWithChildren) {
  const [isMoving, setIsMoving] = useState<boolean>(false)

  enum Rotate {
    'default' = 'rotate-0',
    '90-deg' = 'rotate-90',
    '180-deg' = 'rotate-180',
    '270-deg' = 'rotate-[270deg]'
  }

  const [rotate, setRotate] = useState(Rotate.default)
  const rotateTemplate = useCallback(() => {
    switch (rotate) {
      case Rotate.default: {
        setRotate(Rotate['90-deg'])
        break
      }
      case Rotate['90-deg']: {
        setRotate(Rotate['180-deg'])
        break
      }
      case Rotate['180-deg']: {
        setRotate(Rotate['270-deg'])
        break
      }
      default: {
        setRotate(Rotate.default)
      }
    }
  }, [rotate, Rotate])

  const [scale, setScale] = useState('scale-[1]')
  const zoomIn = useCallback(() => {
    const scaleNumber = +scale.slice(7, scale.length - 1) + 0.25
    if (scaleNumber <= 2.5) {
      setScale(getScale(scaleNumber))
    }
  }, [scale])
  const zoomOut = useCallback(() => {
    const scaleNumber = +scale.slice(7, scale.length - 1) - 0.25
    if (scaleNumber >= 0.25) {
      setScale(getScale(scaleNumber))
    }
  }, [scale])

  const contextValue = useMemo(
    () => ({
      scale,
      minScale: 'scale-[0.25]',
      maxScale: 'scale-[2.5]',
      zoomIn,
      zoomOut,
      rotate,
      rotateTemplate,
      isMoving,
      move: () => setIsMoving(!isMoving)
    }),
    [scale, zoomIn, zoomOut, rotate, isMoving, rotateTemplate]
  )

  return (
    <ActionsMenuContext.Provider value={contextValue}>
      {children}
    </ActionsMenuContext.Provider>
  )
}
