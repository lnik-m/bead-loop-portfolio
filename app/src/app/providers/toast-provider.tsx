import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { useTheme } from 'features/theme'

export function ToastProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 20,
          left: 20,
          right: 20,
          bottom: 20
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: isDark
              ? 'var(--color-bead-loop-dark-20)'
              : 'var(--color-bead-loop-light-20)',
            color: isDark
              ? 'var(--color-bead-loop-light-50)'
              : 'var(--color-bead-loop-purple)',
            border: `1px solid ${
              isDark
                ? 'var(--color-bead-loop-gray-20)'
                : 'var(--color-bead-loop-light-70)'
            }`,
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            fontFamily: 'Inter, sans-serif'
          },
          success: {
            style: {
              borderLeft: `4px solid var(--color-bead-loop-green)`
            },
            iconTheme: {
              primary: 'var(--color-bead-loop-green)',
              secondary: 'var(--color-bead-loop-light-20)'
            }
          },
          error: {
            style: {
              borderLeft: `4px solid var(--color-bead-loop-alert)`
            },
            iconTheme: {
              primary: 'var(--color-bead-loop-alert)',
              secondary: 'var(--color-bead-loop-light-20)'
            }
          }
        }}
      />
    </>
  )
}
