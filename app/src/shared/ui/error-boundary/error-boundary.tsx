import { IconAlertCircle } from '@tabler/icons-react'

import { useEffect, useState } from 'react'
import { isRouteErrorResponse } from 'react-router'
import { useLocalStorage } from '@mantine/hooks'
import type { ISupportedLocale } from 'shared/i18n'
import type { Theme } from '../../types'
import type { Bead } from './types'
import { COLORS, messages } from './constants'
import { BeadAnimation } from './bead-animation'

export function ErrorBoundary({ error }: { error: unknown }) {
  const [beads, setBeads] = useState<Array<Bead>>([])

  const [locale] = useLocalStorage<ISupportedLocale>({
    key: 'lang',
    defaultValue: 'en'
  })
  const [theme] = useLocalStorage<Theme>({
    key: 'theme',
    defaultValue: 'light'
  })

  let message = ''
  let details = ''
  let code: 404 | undefined
  let stack: string | undefined

  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    error.status === 404
  ) {
    code = 404
    message = messages[locale].notFound.message
    details = messages[locale].notFound.details
  } else if (error && isRouteErrorResponse(error)) {
    message = messages[locale].base.message
    details = error.statusText || messages[locale].base.details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    message = messages[locale].base.message
    details = error.message
    stack = error.stack
  }

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

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full bg-bead-loop-light-20/95 dark:bg-bead-loop-error-card backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-bead-loop-rose/20 dark:border-bead-loop-rose/10">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-bead-loop-rose/10 flex items-center justify-center animate-pulse">
              <IconAlertCircle
                className="w-10 h-10 text-bead-loop-rose"
                stroke={1.5}
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-bead-loop-purple dark:text-bead-loop-light-20 mb-2">
            {message}
          </h1>

          <p className="text-bead-loop-gray dark:text-gray-300 mb-6">
            {details}
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            {code !== 404 && (
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-bead-loop-purple text-bead-loop-light-20 rounded-lg hover:bg-bead-loop-purple/80 transition-colors shadow-lg hover:shadow-xl"
              >
                {messages[locale].buttons.reload}
              </button>
            )}
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2.5 bg-bead-loop-gray-20/10 text-bead-loop-gray dark:text-gray-200 rounded-lg hover:bg-bead-loop-gray-20/20 dark:hover:bg-bead-loop-light-20/10 transition-colors"
            >
              {messages[locale].buttons.back}
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className="px-6 py-2.5 bg-bead-loop-gray-20/10 text-bead-loop-gray dark:text-gray-200 rounded-lg hover:bg-bead-loop-gray-20/20 dark:hover:bg-bead-loop-light-20/10 transition-colors"
            >
              {messages[locale].buttons.main}
            </button>
          </div>

          {stack && (
            <details className="mt-4 text-left">
              <summary className="text-sm text-bead-loop-gray dark:text-gray-300 cursor-pointer hover:text-bead-loop-purple dark:hover:text-bead-loop-light-20 transition-colors">
                {messages[locale].details}
              </summary>
              <pre className="mt-2 p-3 bg-bead-loop-gray-20/5 dark:bg-bead-loop-light-20/5 rounded-lg text-xs text-bead-loop-alert dark:text-rose-400 overflow-auto max-h-48">
                <code>{stack}</code>
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}
