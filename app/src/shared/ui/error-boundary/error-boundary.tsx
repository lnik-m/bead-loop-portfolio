import { useEffect, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import type { Theme } from '../../types'
import { ErrorFallback } from '../error-fallback'
import type { Bead } from './types'
import { COLORS } from './constants'
import { BeadAnimation } from './bead-animation'

export function ErrorBoundary({ error }: { error: unknown }) {
  const [beads, setBeads] = useState<Array<Bead>>([])

  const [theme] = useLocalStorage<Theme>({
    key: 'theme',
    defaultValue: 'light'
  })

  useEffect(() => {
    const beadCount = 25 + Math.floor(Math.random() * 20)
    const newBeads = []

    for (let i = 0; i < beadCount; i++) {
      const size = 18 + Math.random() * 26
      const xPosition = Math.random() * window.innerWidth

      const stayOnGround = i < beadCount * 0.6
      const freezeAt = stayOnGround ? 0 : 0.2 + Math.random() * 0.6

      newBeads.push({
        id: i,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: size,
        startX: xPosition,
        startY: -50 - Math.random() * 150,
        delay: Math.random() * 2000,
        duration: 6000 + Math.random() * 3000,
        bounceHeight: 350 + Math.random() * 200,
        rollDistance: 300 + Math.random() * 400,
        rollDirection: Math.random() > 0.5 ? 1 : -1,
        stayOnGround,
        groundYOffset: -15 + Math.random() * 40,
        freezeAt
      })
    }

    setBeads(newBeads)
  }, [])

  return (
    <div
      className={`${theme} relative min-h-screen overflow-hidden bg-bead-loop-light-70 dark:bg-bead-loop-dark-20`}
    >
      {beads.map(bead => (
        <BeadAnimation
          key={bead.id}
          color={bead.color}
          size={bead.size}
          startX={bead.startX}
          startY={bead.startY}
          delay={bead.delay}
          duration={bead.duration}
          bounceHeight={bead.bounceHeight}
          rollDistance={bead.rollDistance}
          rollDirection={bead.rollDirection}
          stayOnGround={bead.stayOnGround}
          groundYOffset={bead.groundYOffset}
          freezeAt={bead.freezeAt}
        />
      ))}

      <ErrorFallback fullScreen error={error} />
    </div>
  )
}
