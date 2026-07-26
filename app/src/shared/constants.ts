export const MIN_SCALE = 'scale-[0.12]'
export const scaleRange: Map<number, string> = new Map()
scaleRange.set(0.25, 'scale-[0.25]')
scaleRange.set(0.5, 'scale-[0.5]')
scaleRange.set(0.75, 'scale-[0.75]')
scaleRange.set(1, 'scale-[1]')
scaleRange.set(1.25, 'scale-[1.25]')
scaleRange.set(1.5, 'scale-[1.5]')
scaleRange.set(1.75, 'scale-[1.75]')
scaleRange.set(2, 'scale-[2]')
scaleRange.set(2.25, 'scale-[2.25]')
scaleRange.set(2.5, 'scale-[2.5]')

export const ERROR_FALLBACK_MESSAGES = {
  en: {
    notFound: {
      message: '404',
      details: 'Page Not Found'
    },
    base: {
      message: 'Oops!',
      details: 'An unexpected error occurred'
    },
    buttons: {
      reload: 'Reload Page',
      back: 'Return',
      main: 'Go Home'
    },
    details: 'Error details'
  }
}

export const NEW_PROJECT_TITLE = {
  en: 'New Project'
}
