import { IconAlertCircle } from '@tabler/icons-react'

import { isRouteErrorResponse, useAsyncError } from 'react-router'
import { useLocalStorage } from '@mantine/hooks'
import type { ISupportedLocale } from 'shared/i18n'
import { ERROR_FALLBACK_MESSAGES } from 'shared/constants'

export const ErrorFallback = ({
  error: passedError,
  fullScreen
}: {
  error?: unknown
  fullScreen?: boolean
}) => {
  const asyncError = useAsyncError() as Error
  const error = asyncError || passedError

  const [locale] = useLocalStorage<ISupportedLocale>({
    key: 'lang',
    defaultValue: 'en'
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
    message = ERROR_FALLBACK_MESSAGES[locale].notFound.message
    details = ERROR_FALLBACK_MESSAGES[locale].notFound.details
  } else if (error && isRouteErrorResponse(error)) {
    message = ERROR_FALLBACK_MESSAGES[locale].base.message
    details = error.statusText || ERROR_FALLBACK_MESSAGES[locale].base.details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    message = ERROR_FALLBACK_MESSAGES[locale].base.message
    details = error.message
    stack = error.stack
  }

  const height = fullScreen ? '100vh' : 'calc(100vh - 198px)'
  return (
    <div
      className={`relative z-10 flex items-center justify-center p-6`}
      style={{
        minHeight: height,
        maxHeight: height
      }}
    >
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

        <p className="text-bead-loop-gray dark:text-gray-300 mb-6">{details}</p>

        <div className="flex gap-3 justify-center flex-wrap">
          {code !== 404 && (
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-bead-loop-purple text-bead-loop-light-20 rounded-lg hover:bg-bead-loop-purple/80 transition-colors shadow-lg hover:shadow-xl"
            >
              {ERROR_FALLBACK_MESSAGES[locale].buttons.reload}
            </button>
          )}
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 bg-bead-loop-gray-20/10 text-bead-loop-gray dark:text-gray-200 rounded-lg hover:bg-bead-loop-gray-20/20 dark:hover:bg-bead-loop-light-20/10 transition-colors"
          >
            {ERROR_FALLBACK_MESSAGES[locale].buttons.back}
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-2.5 bg-bead-loop-gray-20/10 text-bead-loop-gray dark:text-gray-200 rounded-lg hover:bg-bead-loop-gray-20/20 dark:hover:bg-bead-loop-light-20/10 transition-colors"
          >
            {ERROR_FALLBACK_MESSAGES[locale].buttons.main}
          </button>
        </div>

        {stack && (
          <details className="mt-4 text-left">
            <summary className="text-sm text-bead-loop-gray dark:text-gray-300 cursor-pointer hover:text-bead-loop-purple dark:hover:text-bead-loop-light-20 transition-colors">
              {ERROR_FALLBACK_MESSAGES[locale].details}
            </summary>
            <pre className="mt-2 p-3 bg-bead-loop-gray-20/5 dark:bg-bead-loop-light-20/5 rounded-lg text-xs text-bead-loop-alert dark:text-rose-400 overflow-auto max-h-48">
              <code>{stack}</code>
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
