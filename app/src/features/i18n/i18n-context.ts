import { createContext } from 'react'
import type { DeepKeyOf, ISupportedLocale, IBaseMessages } from 'shared/i18n'

export interface I18nContextType {
  locale: ISupportedLocale
  changeLocale: (locale: ISupportedLocale) => void
  localize: <T extends DeepKeyOf<IBaseMessages>>(id: T) => string
}

export const I18nContext = createContext<I18nContextType | null>(null)
