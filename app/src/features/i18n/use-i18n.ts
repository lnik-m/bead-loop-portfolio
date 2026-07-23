import { useContext } from 'react'
import { I18nContext } from './i18n-context'

export const useI18n = () => {
  const i18n = useContext(I18nContext)
  if (!i18n) throw new Error('Error: i18n context is not defined')
  return i18n
}
