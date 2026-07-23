import { type PropsWithChildren, useCallback, useMemo } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { I18nContext } from 'features/i18n'
import type { DeepKeyOf, IBaseMessages, ISupportedLocale } from 'shared/i18n'
import { getMessageById, getMessagesByLocale } from 'shared/i18n'

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocale] = useLocalStorage<ISupportedLocale>({
    key: 'lang',
    defaultValue: 'en'
  })

  const changeLocale = useCallback((newLocale: ISupportedLocale) => {
    setLocale(newLocale)
  }, [])

  const messages = useMemo(() => getMessagesByLocale(locale), [locale])
  const localize = useCallback(
    <T extends DeepKeyOf<IBaseMessages>>(id: T) => {
      return getMessageById(messages, id)
    },
    [messages]
  )

  const contextValue = useMemo(
    () => ({ locale, changeLocale, localize }),
    [locale, changeLocale, localize]
  )
  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  )
}
