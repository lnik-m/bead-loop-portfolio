import { useI18n } from 'features/i18n'

export const LangToggle = () => {
  const { locale } = useI18n()
  return <button>{locale.toUpperCase()}</button>
}
