import { useI18n } from 'features/i18n'

export const LangToggle = () => {
  const { locale, changeLocale } = useI18n()
  const handleChangeLocale = () => {
    const newLocale = (() => {
      if (locale === 'en') return 'es'
      if (locale === 'es') return 'ru'
      return 'en'
    })()
    changeLocale(newLocale)
  }
  return <button onClick={handleChangeLocale}>{locale.toUpperCase()}</button>
}
